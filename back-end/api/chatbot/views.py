from django.shortcuts import render, reverse
from rest_framework import generics
from .models import ChatBot
from django.http import HttpResponseRedirect, JsonResponse
import google.generativeai as genai
# Create your views here.
from vehicles.models import ToyotaVehicle
from vehicles.serializers import ToyotaVehicleSerializer

# Configure the API key for genai
genai.configure(api_key="AIzaSyCndhNGwAwdI_MAAnez7IGN2hvFCuby_gs")

def home(request):
    return render(request, 'chatbot.html')

def ask_question(request):
    if request.method == "POST":
        queryset = ToyotaVehicle.objects.all()
        serializer = ToyotaVehicleSerializer(queryset, many=True)
        json_serializer = serializer.data

        text = request.POST.get("text")
        model = genai.GenerativeModel("gemini-pro")
        chat = model.start_chat()
        response = chat.send_message(text)

        # Save the chat data without requiring a user
        ChatBot.objects.create(
            text_input=text, gemini_output=response.text, user=None
        )

        # Extract necessary data from response
        response_data = {
            "text": response.text,  # Assuming response.text contains the relevant response data
        }
        return JsonResponse({"data": response_data})
    else:
        return HttpResponseRedirect(
            reverse("chat")
        )
    
def chat(request):
    # Fetch all chats (since there's no user dependency now)
    chats = ChatBot.objects.all()
    return render(request, "chat_bot.html", {"chats": chats})
