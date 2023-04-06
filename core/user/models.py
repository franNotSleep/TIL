from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from core.abstract.models import AbstractModel, AbstractManager

from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.db import models


class UserManager(BaseUserManager, AbstractManager):
    def create_user(self, username, email, password=None, **kwargs):
        if username is None:
            raise TypeError("Users must have an username.")
        if email is None:
            raise TypeError("Users must have an email.")
        if password is None:
            raise TypeError("Users must have a password.")

        user = self.model(
            username=username, email=self.normalize_email(email), **kwargs
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **kwargs):
        if password is None:
            raise TypeError("superusers must have a password.")
        if username is None:
            raise TypeError("superusers must have a username.")
        if email is None:
            raise TypeError("superusers must have a email.")

        user = self.create_user(username, email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class User(AbstractModel, AbstractBaseUser):
    username = models.CharField(db_index=True, max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    bio = models.TextField(null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def __str__(self):
        return f"{self.email}"

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"
