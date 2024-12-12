from django.db import models
from datetime import datetime


class File(models.Model):
    file_name = models.CharField(max_length=100)
    file_size = models.IntegerField()
    last_modified = models.DateTimeField(default=datetime.now)
    is_dir = models.BooleanField(default=False)

    class Meta:
        ordering = ['is_dir', 'file_name']
        managed = False