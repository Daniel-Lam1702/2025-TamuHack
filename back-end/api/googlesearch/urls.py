# urls.py
# urls.py
from django.urls import path
from . import views

urlpatterns = [ 
   path('google-search/', views.google_search, name='google_search'),
]

