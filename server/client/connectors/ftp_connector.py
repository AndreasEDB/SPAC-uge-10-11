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
        self.conn = FTP()
        print(f"Connecting to {self.connection.host} on port {self.connection.port or self.connection.protocol.port}")
        try:
            self.conn.connect(self.connection.host, self.connection.port or self.connection.protocol.port)
            if self.connection.username and self.connection.password:
                self.conn.login(self.connection.username, self.connection.password)
            else:
                self.conn.login()

        except socket.gaierror as e:
            print(f"Failed to connect: {e}")
            raise

        return self.conn

    def send(self, message):
        self.conn.sendcmd(message)

    def receive(self):
        return self.conn.getwelcome()
    
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
