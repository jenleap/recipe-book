from django.urls import path
from base.views import recipe_views as views

urlpatterns = [
    path('', views.getRecipes, name="recipes"),
    path('create/', views.createRecipe, name="recipe-create"),
    path('<str:pk>/', views.getRecipe, name="recipe")
]