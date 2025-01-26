from django.urls import path
from .views import ToyotaVehicleList

urlpatterns = [
    path('api/toyota_vehicles/', ToyotaVehicleList.as_view(), name='toyota-vehicles-list'),
]
