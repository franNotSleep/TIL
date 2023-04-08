from rest_framework import viewsets


class AbstractViewSet(viewsets.ModelViewSet):
    ordering_field = ["created", "updated"]
    ordering = ["-updated"]
