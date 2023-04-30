from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Dummy API",
      default_version='v1',
      description="Dummy description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@dummy.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(("core.routers", "core"), namespace="core-api")),
    path(r"docs/", schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
