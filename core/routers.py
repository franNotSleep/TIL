from rest_framework import routers
from core.user.viewsets import UserViewSet
from core.auth.viewsets import LoginViewSet, RegisterViewSet, RefreshViewSet
from core.post.viewsets import PostViewSet
from core.comment.viewsets import CommentViewSet

from rest_framework_nested import routers

router = routers.SimpleRouter()

########################################
################## USER ################
########################################

router.register(r"user", UserViewSet, basename="user")

########################################
################## AUTH ################
########################################
router.register(f"auth/login", LoginViewSet, basename="auth-login")
router.register(f"auth/register", RegisterViewSet, basename="auth-register")
router.register(f"auth/refresh", RefreshViewSet, basename="auth-refresh")

########################################
################## POST ################
########################################
router.register(f"post", PostViewSet, basename="post")
posts_router = routers.NestedSimpleRouter(router, r"post", lookup="post")

########################################
################## COMMENT #############
########################################

posts_router.register(r"comment", CommentViewSet, basename="post-comment")

urlpatterns = [*router.urls, *posts_router.urls]
