from django.shortcuts import render
from .models import Calender
from .serializers import CalenderSerializer
from rest_framework.generics import ListAPIView 
# Create your views here.

class CalenderList(ListAPIView):
    queryset = Calender.objects.all()
    serializer_class = CalenderSerializer