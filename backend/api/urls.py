from django.urls import path

from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"project", views.ProjectViewSet, basename="project")
urlpatterns = router.urls
"""urlpatterns = [
    path("", views.index, name="index"),
]"""