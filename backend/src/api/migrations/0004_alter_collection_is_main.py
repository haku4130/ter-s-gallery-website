# Generated by Django 5.0.6 on 2024-07-19 13:08

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_alter_collection_is_main"),
    ]

    operations = [
        migrations.AlterField(
            model_name="collection",
            name="is_main",
            field=models.BooleanField(
                default=False,
                help_text="Выбор коллекции для отображения на главной странице. При выборе, заменяет выбранную до этого момента.",
            ),
        ),
    ]
