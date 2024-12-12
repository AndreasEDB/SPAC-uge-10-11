from django.db import models
from django.conf import settings

# Create your models here.
class Image(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    base64_image = models.TextField()
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title