from datetime import datetime
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from connection.serializers import CategorySerializer, ConnectionSerializer, ProtocolSerializer, TestConnectionSerializer
from client.connectors.get_connector import get_connector

from .models import Category, Connection, Protocol

class CategoryViewset(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = [permissions.IsAuthenticated]


class ProtocolViewset(ModelViewSet):
    queryset = Protocol.objects.all()
    serializer_class = ProtocolSerializer
    http_method_names = ['get']
    permission_classes = [permissions.IsAuthenticated]


class ConnectionViewset(ModelViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer: ConnectionSerializer):
        if len(serializer.validated_data.get('category')) == 0:
            default_category = Category.objects.get(name='Default')
            serializer.validated_data['category'] = [default_category]

        serializer.save(owner=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        connections = Connection.objects.filter(owner=request.user)
        connection_serializer = ConnectionSerializer(connections, many=True)
        return Response(connection_serializer.data)
        # return super().retrieve(request, *args, **kwargs)

class TestConnectionView(APIView):
    http_method_names = ['post']
    ## post request5
    ## Recieves ConnectionSerializer
    def post(self, request):
        request.data['name'] = f'Test Connection_{datetime.now()}'
        connection_serializer = ConnectionSerializer(data=request.data)

        if connection_serializer.is_valid():
            connection_serializer.validated_data.pop('category')
            connection = Connection(**connection_serializer.validated_data)
            connector = get_connector(connection)

            if connector.test():
                return Response({'status': 'Connection successful'}, status=status.HTTP_200_OK)
            
        return Response(connection_serializer.errors, status=status.HTTP_400_BAD_REQUEST)