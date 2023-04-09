from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import NotFound

from core.comment.viewsets import CommentViewSet
from core.reinforce.serializers import ReinfoceSerializer
from core.reinforce.models import Reinforce


class ReinforceViewSet(CommentViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = ReinfoceSerializer

    def get_queryset(self):
        post_pk = self.kwargs["post_pk"]
        if post_pk is None:
            raise NotFound(detail="Not found.")
        queryset = Reinforce.objects.filter(post__public_id=post_pk)

        return queryset

    def get_object(self):
        instance = Reinforce.objects.get_object_by_public_id(self.kwargs["pk"])

        self.check_object_permissions(self.request, instance)

        return instance
