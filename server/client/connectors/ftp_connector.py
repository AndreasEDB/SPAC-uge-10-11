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
        with self.connect() as connector:
            connector.cwd(path)
            files = []
            dirs = []
            connector.dir(lambda line: dirs.append(File(file_name=line.split()[-1], is_dir=True)) if line.startswith('d') else files.append(File(file_name=line.split()[-1], is_dir=False)))
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
