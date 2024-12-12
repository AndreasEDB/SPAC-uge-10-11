# serializers.py
import base64
from rest_framework import serializers
from .models import Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'title', 'description', 'created_at', 'owner', 'base64_image']


class PostImageSerializer(serializers.ModelSerializer):
    # File field for receiving the file
    file = serializers.FileField(write_only=True, required=True)

    class Meta:
        model = Image
        fields = ['id', 'title', 'description', 'created_at', 'owner', 'base64_image', 'file']
        read_only_fields = ['base64_image']  # Base64 image is read-only and computed on save

    def create(self, validated_data):
        file = validated_data.pop('file')  # Extract the file
        base64_image = base64.b64encode(file.read()).decode('utf-8')  # Encode file as Base64
        validated_data['base64_image'] = base64_image  # Add Base64 image to the data
        return super().create(validated_data)

