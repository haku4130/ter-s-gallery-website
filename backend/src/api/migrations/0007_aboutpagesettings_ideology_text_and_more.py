# Generated by Django 5.2 on 2025-05-05 18:44

import django_ckeditor_5.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_aboutpagesettings_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='aboutpagesettings',
            name='ideology_text',
            field=django_ckeditor_5.fields.CKEditor5Field(default='none', help_text='Текст, который будет отображаться на странице "О нас" в разделе "Идеология"', verbose_name='Идеология'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='aboutpagesettings',
            name='materials_text',
            field=django_ckeditor_5.fields.CKEditor5Field(default='none', help_text='Текст, который будет отображаться на странице "О нас" в разделе "Материалы"', verbose_name='Материалы'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='aboutpagesettings',
            name='production_text',
            field=django_ckeditor_5.fields.CKEditor5Field(default='none', help_text='Текст, который будет отображаться на странице "О нас" в разделе "Производство"', verbose_name='Производство'),
            preserve_default=False,
        ),
    ]
