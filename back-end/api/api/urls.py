from django.contrib import admin
from django.urls import path, include
from chatbot.views import ask_question, chat, home
from googlesearch.views import google_search

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('vehicles.urls')),  # Include the vehicles app's routes
    path('', home, name="home"),
    path("ask_question/", ask_question, name="ask_question"),
    path("chat/", chat, name="chat"),
    path('google-search/', google_search, name='google_search'),
]
