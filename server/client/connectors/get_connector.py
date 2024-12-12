from typing import Union

from connection.models import Connection
from connection.serializers import ConnectionSerializer, TestConnectionSerializer
from .base_connector import BaseConnector
from .ftp_connector import FTPConnector


def get_connector(connection: Connection) -> BaseConnector | None:
    
    if connection.protocol.name == 'FTP':
        return FTPConnector(connection)
    return None