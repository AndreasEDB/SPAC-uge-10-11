from ftplib import FTP
import os
from typing import List
from connection.models import Connection
from client.models import File

from .base_connector import BaseConnector


class FTPConnector(BaseConnector):
    connection: Connection | None = None
    conn: FTP

    def __init__(self, connection: Connection):
        super().__init__(connection)

    def test(self) -> bool:
        with self.connect() as connector:
            res = connector.getwelcome()
            print(res)
            return True

    def connect(self) -> FTP:
        self.conn = FTP()
        self.conn.connect(self.connection.host, self.connection.port or self.connection.protocol.port)
        self.conn.login(self.connection.username, self.connection.password)

        return self.conn

    def send(self, message):
        self.conn.sendcmd(message)

    def receive(self):
        return self.conn.getwelcome()
    
    def list_dir(self, path: str) -> List[File]:
        def file_name(line: str) -> str:
            return line.split()[-1]
        
        def is_dir(line: str) -> bool:
            return line.startswith('d')
        
        def file_size(line: str) -> int:
            return line.split()[4]
        

        

        with self.connect() as connector:
            connector.cwd(path)
            files = []
            dirs = []
            # connector.dir(lambda line: print(line.split()))
            connector.dir(lambda line: dirs.append(File(file_name=file_name(line), is_dir=is_dir(line), file_size=file_size(line))))
            return [*dirs, *files]
        

if __name__ == '__main__':
    from server.connection.models import Connection

    connection = Connection(
        host='193.181.23.146',
        port=21,
        username='ftp_user',
        password='h0rzeRad1sh'
    )
    
    ftp = FTPConnector(connection)
    with ftp.connect() as connector:
        print(ftp.receive())
