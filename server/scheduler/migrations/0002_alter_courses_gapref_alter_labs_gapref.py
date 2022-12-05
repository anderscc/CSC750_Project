# Generated by Django 4.1.3 on 2022-12-05 17:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('scheduler', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='GAPref',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='scheduler.gata'),
        ),
        migrations.AlterField(
            model_name='labs',
            name='GAPref',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='scheduler.gata'),
        ),
    ]
