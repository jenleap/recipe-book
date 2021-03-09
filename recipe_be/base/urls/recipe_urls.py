from django.urls import path
from base.views import recipe_views as views

urlpatterns = [
    path('', views.getRecipes, name="recipes"),
    path('create/', views.createRecipe, name="recipe-create"),
    path('<str:pk>/', views.getRecipe, name="recipe"),
    path('update/<str:pk>/', views.updateRecipe, name="recipe-update"),
    path('delete/<str:pk>/', views.deleteRecipe, name="recipe-delete"),
    path('ingredient/delete/<str:pk>/', views.deleteIngredient, name="ingredient-delete"),
    path('step/delete/<str:pk>/', views.deleteStep, name="step-delete"),
]