from core.abstract.viewsets import AbstractViewSet
from core.comment.serializers import CommentSerializer
from core.comment.models import Comment

from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status


class CommentViewSet(AbstractViewSet):
    """
    Defines a view set for managing comments on posts. Inherits from the AbstractViewSet class and provides CRUD operations
    for comments, with authentication required for all operations. The view set allows GET, POST, PUT, and DELETE requests.
    """

    http_method_names = ("get", "post", "put", "delete")
    permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer

    def get_queryset(self):
        """
        Returns the queryset of comments associated with the post specified in the request.
        Raises NotFound exception if post is not found.

        Returns:
            queryset: QuerySet of comments associated with the post specified in the request.
        """
        post_pk = self.kwargs["post_pk"]
        if post_pk is None:
            raise NotFound(detail="Not found.")
        queryset = Comment.objects.filter(post__public_id=post_pk)

        return queryset

    def get_object(self):
        """
        Returns a specific comment object identified by the public ID specified in the request.
        Raises NotFound exception if comment is not found.

        Returns:
            instance: Comment object identified by the public ID specified in the request.
        """
        instance = Comment.objects.get_object_by_public_id(self.kwargs["pk"])

        self.check_object_permissions(self.request, instance)

        return instance

    def create(self, request, *args, **kwargs):
        """
        Handles creating a new comment object with the data provided in the request.
        Returns:
            Response: HTTP response object containing the serialized data for the new comment.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
