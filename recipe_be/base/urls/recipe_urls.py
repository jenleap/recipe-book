from django.urls import path
from base.views import recipe_views as views

urlpatterns = [
    path('', views.getRecipes, name="recipes"),
    path('<str:pk>/', views.getRecipe, name="recipe"),
]