from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import viewsets
from .models import Image
from .serializers import ImageSerializer, PostImageSerializer

class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return PostImageSerializer
        return ImageSerializer
