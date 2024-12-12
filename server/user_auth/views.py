# views.py
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions

from .models import AuthUser
from .serializers import PostUserSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    queryset = AuthUser.objects.all().order_by('id')
    def get_serializer_class(self):
        if self.action == 'create':
            return PostUserSerializer
        return UserSerializer
    allowed_methods = ['GET', 'POST', 'PUT', 'DELETE']
