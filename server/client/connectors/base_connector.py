
from abc import ABC, abstractmethod
from ftplib import FTP
from typing import List, Union

import pysftp
from connection.models import Connection as Connection
from client.models import File


class BaseConnector(ABC):
    connection: Connection | None = None
    conn: Union[FTP | pysftp.Connection]
    def __init__(self, connection: Connection):
        self.connection = connection
    
    @abstractmethod
    def test(self) -> bool:
        pass

    @abstractmethod
    def connect(self) -> Union[FTP | pysftp.Connection]:
        pass
    
    @abstractmethod
    def list_dir(self, path: str) -> List[File]:
        pass

    @abstractmethod
    def download(self, path: str) -> bytes:
        pass

    @abstractmethod
    def upload(self, path: str):
        pass