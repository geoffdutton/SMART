# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-07-30 19:17
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0043_auto_20180730_1900"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="data",
            name="df_idx",
        ),
    ]
