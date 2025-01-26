from django.shortcuts import render
# views.py
# views.py
import requests
from django.http import JsonResponse
from vehicles.models import ToyotaVehicle
from django.conf import settings

def google_search(request):
    if request.method == 'GET':
        print("hello")
        # Get the list of cars from your database
        cars = ToyotaVehicle.objects.all()

        # Google Custom Search API Key and Search Engine ID
        api_key = settings.GOOGLE_API_KEY
        cx = settings.GOOGLE_CX
        
        results = []
        for car in cars:
            # Construct query for each car model (e.g., "Toyota Camry 2020")
            query = f"{car.model} {car.model_year} exterior"

            # Perform the Google Custom Search for images
            response = requests.get(f"https://www.googleapis.com/customsearch/v1", params={
                'key': api_key,
                'cx': cx,
                'searchType': 'image',
                'q': query,
                'num': 1  # Number of results to fetch per car (you can adjust this)
            })
            
            data = response.json()
            
            if 'items' in data:
                # Extract image URL for the first result
                image_url = data['items'][0]['link']
                car.image_url = image_url  # Store the image URL in the model
                car.save()  # Save the updated car object
                
                results.append({
                    'car_id': car.id,
                    'car_name': f"{car.model} {car.model_year}",
                    'image_url': image_url
                })
        
        # Return the results as a JSON response
        return JsonResponse({'cars': results})