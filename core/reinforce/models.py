from django.db import models

from django.core.validators import URLValidator

from core.abstract.models import AbstractManager, AbstractModel


def upload_to(instance, filename):
    return "images/{filename}".format(filename=filename)


class ReinforceManager(AbstractManager):
    pass


class Reinforce(AbstractModel):
    author = models.ForeignKey(to="core_user.User", on_delete=models.CASCADE)
    post = models.ForeignKey(to="core_post.Post", on_delete=models.CASCADE)
    body = models.TextField()
    source = models.URLField(
        max_length=250, null=True, validators=[URLValidator(schemes=["https"])]
    )
    photo = models.ImageField(null=True, blank=True, upload_to=upload_to)

    objects = ReinforceManager()
