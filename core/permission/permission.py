from rest_framework.permissions import BasePermission


class AuthorOrReadOnly(BasePermission):
    """
    Allows authenticated users to perform CRUD operations and unauthenticated users to only perform read actions.
    Authenticated users can only edit their own creations.
    """

    def has_permission(self, request, view):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            # Allow unauthenticated users to read data
            return True

        # Allow authenticated users to perform CRUD operations
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in ("GET", "HEAD", "OPTIONS"):
            # Allow unauthenticated users to read data
            return True

        # Allow users to edit themselves
        if request.user == obj:
            return True

        # Allow authenticated users to edit their own obj
        return obj.author == request.user
