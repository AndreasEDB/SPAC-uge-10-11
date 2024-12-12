# migrations/0002_add_default_category.py
from django.db import migrations

def create_default_category(apps, schema_editor):
    # Dynamically get the Category model
    Category = apps.get_model('connection', 'Category')
    # Create the default category if it does not exist
    if not Category.objects.filter(name='Default').exists():
        Category.objects.create(
            name='Default',
            description='This is the default category.'
        )

def remove_default_category(apps, schema_editor):
    # Dynamically get the Category model
    Category = apps.get_model('connection', 'Category')
    # Remove the default category (if needed during rollback)
    Category.objects.filter(name='Default').delete()

class Migration(migrations.Migration):

    dependencies = [
        ('connection', '0001_initial'),  # Replace with the actual last migration
    ]

    operations = [
        migrations.RunPython(create_default_category, remove_default_category),
    ]
