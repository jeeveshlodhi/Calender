from django.urls import path
from api import views

urlpatterns = [
    path('calender/', views.CalenderList.as_view()),
]