# views.py
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

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


class SelfView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

