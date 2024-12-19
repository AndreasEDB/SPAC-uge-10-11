from django.urls import path

from client.views import DirectoryView, FileEditView, FileView


urlpatterns = [
    path('directory/', DirectoryView.as_view()),
    path('file/', FileView.as_view()),
    path('file/edit/', FileEditView.as_view()),
]