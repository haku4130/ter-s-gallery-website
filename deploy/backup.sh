#!/bin/sh
# Nightly backup of ters.gallery: one tar per run with the database dump, the uploaded media and the
# server's config, kept KEEP newest. The dump is restored into a scratch database and the media archive
# is counted against the volume before older backups are pruned, so a broken backup never replaces good
# ones. The result goes to the journal: journalctl -u ters-backup
set -eu

APP_DIR=${APP_DIR:-/opt/ters}
BACKUP_DIR=${BACKUP_DIR:-$APP_DIR/backups}
KEEP=${KEEP:-7}
SCRATCH=ters_restore_check
step=start
work=

dc() { docker compose "$@"; }
pg() { dc exec -T -e PGOPTIONS='-c client_min_messages=warning' db sh -c "$1"; }

# Row count of every table in database $1, one line, for comparing the live database with the restored one.
counts() {
    pg "psql -v ON_ERROR_STOP=1 -tAqU \"\$POSTGRES_USER\" -d $1" <<'SQL'
select string_agg(table_name || '=' || (xpath('/row/c/text()',
    query_to_xml(format('select count(*) as c from public.%I', table_name), false, true, '')))[1]::text,
    ' ' order by table_name)
from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE';
SQL
}

on_exit() {
    code=$?
    if [ -n "$work" ]; then rm -rf "$work"; fi
    rm -f "$BACKUP_DIR"/.ters-*.part
    if [ "$code" -ne 0 ]; then echo "backup failed at: $step" >&2; fi
}
trap on_exit EXIT

umask 077
cd "$APP_DIR"
mkdir -p "$BACKUP_DIR"
stamp=$(date -u +%Y%m%d-%H%M%S)
work=$(mktemp -d "$BACKUP_DIR/.work-XXXXXX")

step=dump
pg 'pg_dump -U "$POSTGRES_USER" --format=custom "$POSTGRES_DB"' >"$work/db.dump"

step=media
dc exec -T backend tar -C /app/src/media -cf - . >"$work/media.tar"

step=config
mkdir "$work/config"
cp .env Caddyfile docker-compose.yml "$work/config/"
# Products recovered after the old server was lost that are not loaded into the database yet.
if [ -d restore ]; then cp -R restore "$work/config/"; fi

step=restore
pg "psql -v ON_ERROR_STOP=1 -qU \"\$POSTGRES_USER\" -d postgres \
    -c 'DROP DATABASE IF EXISTS $SCRATCH' -c 'CREATE DATABASE $SCRATCH'"
pg "pg_restore -U \"\$POSTGRES_USER\" -d $SCRATCH --no-owner --exit-on-error" <"$work/db.dump"

step=check-db
live=$(counts '"$POSTGRES_DB"')
restored=$(counts $SCRATCH)
pg "psql -qU \"\$POSTGRES_USER\" -d postgres -c 'DROP DATABASE $SCRATCH'"
if [ -z "$restored" ] || [ "$live" != "$restored" ]; then
    echo "rows restored '$restored', live '$live'" >&2
    exit 1
fi

step=check-media
in_volume=$(dc exec -T backend find /app/src/media -type f | wc -l)
# Listed by the container's tar, the one a restore extracts with.
in_archive=$(dc exec -T backend sh -c 'tar -tvf - | grep -c "^-" || true' <"$work/media.tar")
if [ "$in_archive" -eq 0 ] || [ "$in_archive" -ne "$in_volume" ]; then
    echo "media files archived $in_archive, in volume $in_volume" >&2
    exit 1
fi

step=pack
tar -C "$work" -cf "$BACKUP_DIR/.ters-$stamp.part" .
mv "$BACKUP_DIR/.ters-$stamp.part" "$BACKUP_DIR/ters-$stamp.tar"

step=prune
# The glob sorts by the UTC stamp, oldest first.
set -- "$BACKUP_DIR"/ters-*.tar
while [ "$#" -gt "$KEEP" ]; do
    rm -f "$1"
    shift
done
echo "ok ters-$stamp.tar $(du -h "$BACKUP_DIR/ters-$stamp.tar" | cut -f1), media files: $in_archive," \
    "rows: $restored, kept: $#"
