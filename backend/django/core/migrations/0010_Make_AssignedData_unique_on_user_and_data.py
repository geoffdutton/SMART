# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-17 15:40
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0009_Rename_User_labels"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="assigneddata",
            unique_together=set([("user", "queue"), ("user", "data")]),
        ),
    ]
