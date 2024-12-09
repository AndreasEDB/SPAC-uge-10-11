from rest_framework.viewsets import ModelViewSet

from connection.serializers import CategorySerializer, ConnectionSerializer, ProtocolSerializer

from .models import Category, Connection, Protocol

class CategoryViewset(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProtocolViewset(ModelViewSet):
    queryset = Protocol.objects.all()
    serializer_class = ProtocolSerializer


class ConnectionViewset(ModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer