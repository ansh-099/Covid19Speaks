# Generated by Django 3.0.6 on 2020-06-02 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200602_1253'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oneunit',
            name='description',
            field=models.TextField(blank=True, default='', max_length=360),
        ),
    ]
