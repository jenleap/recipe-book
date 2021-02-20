from django.urls import path
from base.views import food_views as views

urlpatterns = [
    path('', views.getFoods, name="foods")
]