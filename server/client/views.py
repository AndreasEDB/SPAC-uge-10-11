import os
from typing import List
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from connection.models import Connection

from client.connectors.get_connector import get_connector
from client.models import File
from .serializers import FileSerializer

# Create your views here.
class DirectoryView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        connector = get_connector(Connection.objects.get(id=int(request.query_params.get('connection'))))
        path = request.query_params.get('path')
        if not path:
            return Response({'error': 'Path parameter is required'}, status=400)
        dir_list: List[File] = connector.list_dir(path)
        serializer = FileSerializer(dir_list, many=True)
        return Response(serializer.data)


class FileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        connection_id = request.query_params.get('connection')
        path = request.query_params.get('path')

        if not connection_id or not path:
            return Response({'error': 'Connection ID and path parameters are required'}, status=400)

        try:
            connection = Connection.objects.get(id=int(connection_id))
            connector = get_connector(connection)
            file_data = connector.download(path)
            response = HttpResponse(file_data, content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{os.path.basename(path)}"'
            return response
        except Connection.DoesNotExist:
            return Response({'error': 'Connection not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)