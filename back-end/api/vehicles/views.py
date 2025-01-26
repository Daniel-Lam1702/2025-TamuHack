from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import ToyotaVehicle
from .serializers import ToyotaVehicleSerializer


class ToyotaVehicleList(APIView):
    """
    API endpoint to GET a list of all Toyota vehicles.
    Supports:
      - Multiple selections for string-based fields.
      - Ranges for numeric fields.
      - Single-value filtering for numeric fields when no range is provided.
    """

    def get(self, request, *args, **kwargs):
        queryset = ToyotaVehicle.objects.none()  # Start with no results

        # Filtering conditions
        filter_conditions = Q()
        filters_applied = False

        # Fields that support multiple selections (string-based)
        string_fields = [
            'model', 'drive_type', 'vehicle_type', 'fuel_type', 
            'transmission_type', 'vehicle_size', 'atv_category'
        ]

        # Fields that support numeric filtering (range + single value)
        numeric_fields = [
            'annual_petroleum_consumption', 'time_to_charge_at_240v', 'city_mpg',
            'city_electricity_consumption', 'co2_emissions', 'combined_mpg', 
            'cylinder_count', 'highway_mpg', 'highway_electricity_consumption', 
            'trunk_capacity', 'epa_fuel_score', 'seats', 'cost_savings', 'model_year', 'price'
        ]

        # Handle multiple selections for string fields
        for field in string_fields:
            values = request.query_params.getlist(field)
            if values:
                field_filter = Q(**{f"{field}__icontains": values[0]})  # Case-insensitive match
                for value in values[1:]:
                    field_filter |= Q(**{f"{field}__icontains": value})
                filter_conditions &= field_filter
                filters_applied = True

        # Handle numeric filtering (range + single value)
        for field in numeric_fields:
            min_value = request.query_params.get(f"min_{field}")
            max_value = request.query_params.get(f"max_{field}")
            exact_value = request.query_params.get(field)  # Single value check

            if min_value is not None:
                filter_conditions &= Q(**{f"{field}__gte": min_value})
                filters_applied = True
            if max_value is not None:
                filter_conditions &= Q(**{f"{field}__lte": max_value})
                filters_applied = True
            if exact_value is not None and min_value is None and max_value is None:
                filter_conditions &= Q(**{f"{field}": exact_value})  # Exact match when no range
                filters_applied = True

        # Execute query only if filters are applied
        if filters_applied:
            queryset = ToyotaVehicle.objects.filter(filter_conditions)
        else:
            queryset = ToyotaVehicle.objects.all()

        # Sorting by price
        sort_price = request.query_params.get('sort_price')
        if sort_price:
            if sort_price.lower() == 'asc':
                queryset = queryset.order_by('price')
            elif sort_price.lower() == 'desc':
                queryset = queryset.order_by('-price')

        # Serialize & return filtered data
        serializer = ToyotaVehicleSerializer(queryset, many=True)
        return Response(serializer.data)
