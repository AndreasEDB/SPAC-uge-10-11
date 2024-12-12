
from abc import ABC, abstractmethod
from ftplib import FTP
from typing import List

import pysftp
from connection.models import Connection as Connection
from client.models import File


class BaseConnector(ABC):
    connection: Connection | None = None
    conn: FTP | pysftp.Connection
    def __init__(self, connection: Connection):
        self.connection = connection
    
    @abstractmethod
    def test(self) -> bool:
        pass

    @abstractmethod
    def connect(self) -> None:
        pass
    
    @abstractmethod
    def list_dir(self, path: str) -> List[File]:
        pass

    def send(self, message):
        pass

    def receive(self):
        pass