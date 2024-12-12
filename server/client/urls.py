from django.urls import path

from client.views import DirectoryView


urlpatterns = [
    path('directory/', DirectoryView.as_view()),
]