from core.abstract.viewsets import AbstractViewSet
from core.comment.serializers import CommentSerializer
from core.comment.models import Comment

from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
from core.permission.permission import AuthorOrReadOnly


class CommentViewSet(AbstractViewSet):
    http_method_names = ("get", "post", "put", "delete")
    permission_classes = (AuthorOrReadOnly,)
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_pk = self.kwargs["post_pk"]
        if post_pk is None:
            raise NotFound(detail="Not found.")
        queryset = Comment.objects.filter(post__public_id=post_pk)

        return queryset

    def get_object(self):
        instance = Comment.objects.get_object_by_public_id(self.kwargs["pk"])

        self.check_object_permissions(self.request, instance)

        return instance

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
