#Use router to route viewsets
from rest_framework.routers import DefaultRouter

from connection.views import CategoryViewset, ConnectionViewset, ProtocolViewset

router = DefaultRouter()
router.register('category', CategoryViewset, basename='category')
router.register('protocol', ProtocolViewset, basename='protocol')
router.register('connection', ConnectionViewset, basename='connection')

urlpatterns = router.urls

