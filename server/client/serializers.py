from .models import File
from rest_framework import serializers


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['file_name', 'file_size', 'last_modified', 'is_dir']
        