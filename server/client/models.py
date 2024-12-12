from django.db import models
from datetime import datetime


class File(models.Model):
    file_name = models.CharField(max_length=100)
    file_size = models.IntegerField(null=False)
    last_modified = models.DateTimeField(default=datetime.now)
    is_dir = models.BooleanField(default=False)

    class Meta:
        ordering = ['is_dir', 'file_name']
        managed = False
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.file_size is None:
            raise ValueError('file_size cannot be None')