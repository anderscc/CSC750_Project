# Generated by Django 4.1.8 on 2023-04-10 02:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scheduler', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='courseSection',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='labs',
            name='labSection',
            field=models.CharField(max_length=255),
        ),
    ]
