from django.urls import path
from . import views
from .views import ask_question, chat

urlpatterns = [
    path('', views.home, name='home'),
    path("ask_question/", ask_question, name="ask_question"),
    path("chat/", chat, name="chat"),
]