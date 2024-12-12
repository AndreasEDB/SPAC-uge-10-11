from typing import Optional
from django.db import models # type: ignore
from django.conf import settings # type: ignore

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name

class Protocol(models.Model):
    name = models.CharField(max_length=100, unique=True)
    port = models.IntegerField()

    def __str__(self):
        return self.name

class Connection(models.Model):
    name = models.CharField(max_length=100, unique=True)
    host = models.CharField(max_length=100)
    port = models.IntegerField(null=True)
    username: Optional[models.CharField] = models.CharField(max_length=100, null=True)
    password: Optional[models.CharField] = models.CharField(max_length=100, null=True)
    protocol = models.ForeignKey(Protocol, on_delete=models.CASCADE)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category)

    def __str__(self):
        return self.name
