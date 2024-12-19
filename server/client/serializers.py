import os
from .models import BinaryExtension, File
from rest_framework import serializers
from django.db.models import Q


class FileSerializer(serializers.ModelSerializer):
    editable = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = ['file_name', 'file_size', 'last_modified', 'is_dir', 'editable']
    

    def get_editable(self, obj):


        if obj.is_dir:
            return False

        try:

            # Get all extensions from the database
            extensions = BinaryExtension.objects.values_list('extension', flat=True)

            matching_extensions = [ext for ext in extensions if obj.file_name.endswith(ext)]

            # matching_extensions = BinaryExtension.objects.filter(
            #     Q(*[Q(extension__in=[ext]) for ext in extensions if obj.file_name.endswith(ext)]))
            
            if len(matching_extensions) == 0:
                return True

        except BinaryExtension.DoesNotExist:
            return True
        
        return False
        

        