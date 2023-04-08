from django.db import models

from core.abstract.models import AbstractManager, AbstractModel


class CommentManager(AbstractManager):
    pass


class Comment(AbstractModel):
    author = models.ForeignKey(to="core_user.User", on_delete=models.CASCADE)
    post = models.ForeignKey(to="core_post.Post", on_delete=models.CASCADE)
    body = models.TextField()

    objects = AbstractManager()

    def __str__(self):
        return f"{self.author} comment to {self.post}"
