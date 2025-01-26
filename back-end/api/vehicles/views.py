from django.shortcuts import render
from rest_framework import generics
from .models import ToyotaVehicle
from .serializers import ToyotaVehicleSerializer

class ToyotaVehicleList(generics.ListAPIView):
    """
    API endpoint to GET a list of all Toyota vehicles.
    Supports filtering by model and sorting by price.
    """
    serializer_class = ToyotaVehicleSerializer

    def get_queryset(self):
        queryset = ToyotaVehicle.objects.all()
        model_name = self.request.query_params.get('model')
        sort_price = self.request.query_params.get('sort_price')

        if model_name:
            queryset = queryset.filter(model__icontains=model_name)

        if sort_price:
            if sort_price.lower() == 'asc':
                queryset = queryset.order_by('cost_savings')  # Assuming cost_savings represents price
            elif sort_price.lower() == 'desc':
                queryset = queryset.order_by('-cost_savings')

        return queryset