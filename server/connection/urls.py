#Use router to route viewsets
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from connection.views import CategoryViewset, ConnectionViewset, ProtocolViewset, TestConnectionView

router = DefaultRouter()
router.register('category', CategoryViewset, basename='category')
router.register('protocol', ProtocolViewset, basename='protocol')
router.register('', ConnectionViewset, basename='connection')

urlpatterns = [
    path('test/', TestConnectionView.as_view()),
    path('', include(router.urls)),
]

