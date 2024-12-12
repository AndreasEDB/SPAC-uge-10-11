# Generated by Django 5.1.4 on 2024-12-12 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('connection', '0005_alter_connection_port'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='connection',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='protocol',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]