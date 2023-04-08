from core.abstract.viewsets import AbstractViewSet
from core.post.serializers import PostSerializer
from core.post.models import Post

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class PostViewSet(AbstractViewSet):
    http_method_names = ("get", "post", "put", "delete")
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
    
    def get_queryset(self):
        return Post.objects.all()
    
    def get_object(self):
        public_id = self.kwargs["pk"]
        instance = Post.objects.get_object_by_public_id(public_id=public_id)
        
        self.check_object_permissions(self.request, instance)
        
        return instance
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    