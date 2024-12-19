import mimetypes
import os
from typing import List
from django.http import HttpResponse
from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from client.helpers.file_helper import FileHelper
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

            with open(os.path.join(settings.BASE_DIR, os.path.basename(path)), 'wb') as f:
                f.write(file_data)

            response = HttpResponse(file_data, content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{os.path.basename(path)}"'
            response['Content-Length'] = len(file_data)
            return response
        except Connection.DoesNotExist:
            return Response({'error': 'Connection not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
class FileEditView(APIView):
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

            # Determine the content type
            mime_type, _ = mimetypes.guess_type(path)
            if mime_type and mime_type.startswith('text'):
                # If the file is a text file, decode the bytes to a string
                file_content = file_data.decode('utf-8')
                return Response(file_content, content_type='text/plain')
            else:
                # Otherwise, return the file as a binary download
                response = HttpResponse(file_data, content_type='application/octet-stream')
                response['Content-Disposition'] = f'attachment; filename="{os.path.basename(path)}"'
                response['Content-Length'] = len(file_data)
                return response
        except Connection.DoesNotExist:
            return Response({'error': 'Connection not found'}, status=404)
        except UnicodeDecodeError:
            FileHelper.register_binary_extension(path)
            return Response({'error': 'Unable to decode file contents'}, status=500)
        except Exception as e:
            return Response({'error': str(e)}, status=500)
    
    def put(self, request):
        connection_id: int = request.query_params.get('connection')
        path: str = request.query_params.get('path')
        content: str = request.data.get('content')

        if not connection_id or not path or not content:
            return Response({'error': 'Connection ID, path, and content parameters are required'}, status=400)

        try:
            connection = Connection.objects.get(id=int(connection_id))
            connector = get_connector(connection)
            file_data = content.encode('utf-8')
            connector.upload_file(path, file_data)
            return Response({'success': True})
        except Connection.DoesNotExist:
            return Response({'error': 'Connection not found'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)