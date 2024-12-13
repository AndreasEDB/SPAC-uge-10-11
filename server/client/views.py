from typing import List
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from connection.models import Connection

from client.connectors.get_connector import get_connector
from client.models import File
from .serializers import FileSerializer

# Create your views here.
class DirectoryView(APIView):
    def get(self, request):
        connector = get_connector(Connection.objects.get(id=int(request.query_params['connection'])))
        path = request.query_params.get('path')
        if not path:
            return Response({'error': 'Path parameter is required'}, status=400)
        dir_list: List[File] = connector.list_dir(path)
        serializer = FileSerializer(dir_list, many=True)
        return Response(serializer.data)