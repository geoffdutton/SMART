# Generated by Django 3.2 on 2021-05-11 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0051_adminprogress"),
    ]

    operations = [
        migrations.AlterField(
            model_name="model",
            name="cv_metrics",
            field=models.JSONField(),
        ),
    ]
