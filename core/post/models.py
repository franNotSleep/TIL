from django.db import models
from core.abstract.models import AbstractManager, AbstractModel


class PostManager(AbstractManager):
    pass


class Post(AbstractModel):
    author = models.ForeignKey(to="core_user.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    body = models.TextField()

    objects = PostManager()

    def __str__(self):
        return f"{self.title}"
