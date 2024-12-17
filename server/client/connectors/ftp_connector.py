from datetime import datetime
from ftplib import FTP
import os
from typing import List, cast
from client.parsers.ftp import parse_list_line, parse_mlsd_line
from connection.models import Connection
from client.models import File
import socket

from .base_connector import BaseConnector


class FTPConnector(BaseConnector):
    connection: Connection
    conn: FTP
    port = 21

    def __init__(self, connection: Connection):
        super().__init__(connection)

    def test(self) -> bool:
        try:
            with self.connect() as connector:
                res = connector.getwelcome()
                print(res)
                return True
        except socket.gaierror as e:
            print(f"Failed to connect: {e}")
            return False

    def connect(self) -> FTP:
        self.conn = FTP(timeout=5)
        print(f"Connecting to {self.connection.host} on port {self.connection.port or self.port}")
        try:
            self.conn.connect(self.connection.host, self.connection.port or self.port)
            if self.connection.username and self.connection.password:
                self.conn.login(self.connection.username, self.connection.password)
            else:
                self.conn.login()

        except socket.gaierror as e:
            print(f"Failed to connect: {e}")
            raise

        return self.conn


    
    def list_dir(self, path: str) -> List[File]:
        with self.connect() as connector:
            connector.cwd(path)
            files: List[File] = []
            if "MLSD" in connector.sendcmd("FEAT"):
                for entry in connector.mlsd():
                    name, details = entry
                    files.append(parse_mlsd_line(name, details))
            else:
                connector.dir(lambda line: files.append(parse_list_line(line)))
                
        files.sort(key=lambda f: f.last_modified, reverse=True)
        files.sort(key=lambda f: f.is_dir, reverse=True)
        
        return files
    
    def download(self, path: str) -> bytes:
        with self.connect() as connector:
            connector.cwd(os.path.dirname(path))
            file_name = os.path.basename(path)
            file_data = bytearray()

            def handle_binary(more_data):
                file_data.extend(more_data)

            connector.retrbinary(f"RETR {file_name}", handle_binary)

        return bytes(file_data)

    def upload(self, path: str):
        pass