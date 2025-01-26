from rest_framework import serializers
from .models import ToyotaVehicle

class ToyotaVehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToyotaVehicle
        fields = '__all__'
