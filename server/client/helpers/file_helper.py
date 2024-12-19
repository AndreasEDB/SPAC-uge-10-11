import os
from client.models import BinaryExtension


class FileHelper:
    @staticmethod
    def register_binary_extension(path: str):
        file_name = os.path.basename(path)
        extension = file_name.split('.')[-1]
        BinaryExtension.objects.update_or_create(extension=extension)