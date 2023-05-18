from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework import filters

from core.user.serializers import UserSerializer
from core.user.models import User
from core.permission.permission import AuthorOrReadOnly

from core.abstract.viewsets import AbstractViewSet

from django_filters.rest_framework import DjangoFilterBackend

class UserViewSet(AbstractViewSet):
    """
    API endpoint that allows users to be viewed, edited, and deleted.
    """

    http_method_names = ("patch", "get")
    permission_classes = (AuthorOrReadOnly, IsAuthenticated)
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    #filterset_fields = ["username", "email"]
    #search_fields = ["username", "email"]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']

    def get_queryset(self):
        """
        Return the list of users.
        """
        return User.objects.all()

    def get_object(self):
        """
        Retrieve a user instance by its public ID.

        Ensure that the current user has permission to 
        access the user instance.
        """
        obj = User.objects.get_object_by_public_id(self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj
