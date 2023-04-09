from core.abstract.viewsets import AbstractViewSet
from core.post.serializers import PostSerializer
from core.post.models import Post
from core.permission.permission import AuthorOrReadOnly


from rest_framework.response import Response
from rest_framework import status

from core.abstract.viewsets import AbstractViewSet
from core.post.serializers import PostSerializer
from core.post.models import Post

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


class PostViewSet(AbstractViewSet):
    """
    Viewset for managing Post objects.

    This viewset allows authenticated users to perform CRUD (create, retrieve, update, delete) operations on Post objects.
    """

    http_method_names = ("get", "post", "put", "delete")
    permission_classes = (AuthorOrReadOnly,)
    serializer_class = PostSerializer

    def get_queryset(self):
        """
        Return all Post objects in the database.
        """
        return Post.objects.all()

    def get_object(self):
        """
        Retrieve a single Post object by its public ID.

        This method retrieves a single Post object from the database based on the public ID specified in the URL.
        It checks that the user has permission to access the object before returning it.
        """
        public_id = self.kwargs["pk"]
        instance = Post.objects.get_object_by_public_id(public_id=public_id)

        self.check_object_permissions(self.request, instance)

        return instance

    def create(self, request, *args, **kwargs):
        """
        Handle a POST request to create a new Post object.

        This method creates a new Post object in the database based on the data provided in the POST request.
        It validates the data using the PostSerializer class, then creates a new Post object using the validated data.
        It returns the serialized data for the newly created object along with a 201 HTTP status code.

        Returns:
        A Response object containing the serialized data for the newly created Post object and a 201 HTTP status code.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
