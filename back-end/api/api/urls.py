from django.contrib import admin
from django.urls import path, include
from chatbot.views import ask_question, chat, home

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', include('vehicles.urls')),  # Include the vehicles app's routes
    path('', home, name="home"),
    path("ask_question/", ask_question, name="ask_question"),
    path("chat/", chat, name="chat")
]
