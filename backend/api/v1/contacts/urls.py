from django.urls import path

from . import views


urlpatterns = [
    path("add/", views.MessageCreateAPIView.as_view()),
]