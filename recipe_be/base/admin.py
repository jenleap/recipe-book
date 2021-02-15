from django.contrib import admin
from .models import Recipe, Food

# Register your models here.

admin.site.register(Recipe)
admin.site.register(Food)