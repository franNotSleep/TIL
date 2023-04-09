from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from core.user.serializers import UserSerializer
from core.user.models import User
from core.permission.permission import AuthorOrReadOnly


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed, edited, and deleted.
    """

    http_method_names = ("patch", "get")
    permission_classes = (AuthorOrReadOnly, IsAuthenticated)
    serializer_class = UserSerializer

    def get_queryset(self):
        """
        Return the list of users that the current user has permission to access.

        Superusers can access all users, while regular users can only access non-superusers.
        """
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.exclude(is_superuser=True)

    def get_object(self):
        """
        Retrieve a user instance by its public ID.

        Ensure that the current user has permission to access the user instance.
        """
        obj = User.objects.get_object_by_public_id(self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj
