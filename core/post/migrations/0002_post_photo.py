# Generated by Django 4.0 on 2023-05-06 18:05

import core.reinforce.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_post', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to=core.reinforce.models.upload_to),
        ),
    ]
