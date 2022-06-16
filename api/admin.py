from django.contrib import admin

from .models import Calender
# Register your models here.

@admin.register(Calender)

class CalanderAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email']
