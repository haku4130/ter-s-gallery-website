#!/bin/sh
# Rolls out the latest images. CI runs it over SSH as the deploy user, whose key can run nothing else:
# authorized_keys forces `sudo -n /usr/local/bin/ters-deploy`. The compose file and .env on the server are
# left as they are. The running images are kept as :previous; if the site doesn't answer after the
# rollout, they are put back.
set -eu

APP_DIR=${APP_DIR:-/opt/ters}
SERVICES="backend frontend nginx"
cd "$APP_DIR"

retag() {
    for s in $SERVICES; do docker tag "haku4130/ters-$s:$1" "haku4130/ters-$s:$2"; done
}

site_answers() {
    for _ in $(seq 1 30); do
        if curl -fsS --max-time 10 -o /dev/null -H 'Host: ters.gallery' http://127.0.0.1:8001/api/products/ &&
            curl -fsS --max-time 10 -o /dev/null -H 'Host: ters.gallery' http://127.0.0.1:8001/; then
            return 0
        fi
        sleep 5
    done
    return 1
}

for s in $SERVICES; do
    stale=$(docker image inspect -f '{{.Id}}' "haku4130/ters-$s:previous" 2>/dev/null || true)
    docker tag "haku4130/ters-$s:latest" "haku4130/ters-$s:previous"
    # Untagged by now unless it is still the running image; docker refuses to remove a tagged one.
    if [ -n "$stale" ]; then docker image rm "$stale" >/dev/null 2>&1 || true; fi
done

docker compose pull --quiet $SERVICES
# The backend migrates and collects static files before gunicorn starts.
docker compose up -d $SERVICES
if site_answers; then
    docker compose images $SERVICES
    echo "deployed"
    exit 0
fi

echo "site did not answer after the rollout, putting the previous images back" >&2
docker compose logs --tail 50 backend frontend >&2
retag previous latest
docker compose up -d $SERVICES
if site_answers; then echo "rolled back" >&2; else echo "the previous images do not answer either" >&2; fi
exit 1
