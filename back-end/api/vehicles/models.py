from django.db import models

class ToyotaVehicle(models.Model):
    model = models.CharField(max_length=100)
    annual_petroleum_consumption = models.FloatField()
    time_to_charge_at_240v = models.FloatField()
    city_mpg = models.IntegerField()
    city_electricity_consumption = models.FloatField()
    co2_emissions = models.IntegerField()
    combined_mpg = models.IntegerField()
    cylinder_count = models.IntegerField(null=True, blank=True)
    drive_type = models.CharField(max_length=50)
    vehicle_type = models.CharField(max_length=50)
    epa_fuel_score = models.IntegerField()
    fuel_type = models.CharField(max_length=50)
    highway_mpg = models.IntegerField()
    highway_electricity_consumption = models.FloatField()
    trunk_capacity = models.IntegerField()
    transmission_type = models.CharField(max_length=50)
    vehicle_size = models.CharField(max_length=100)
    model_year = models.IntegerField()
    cost_savings = models.IntegerField()
    atv_category = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "toyota_vehicles"  # Ensure Django maps to existing table
        managed = False  # Prevent Django from modifying the table

    def __str__(self):
        return self.model
