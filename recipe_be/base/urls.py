from django.urls import path
from . import views

urlpatterns = [
    path('users/register/', views.registerUser, name="register"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name="users-profile"),
    path('recipes/', views.getRecipes, name="routes"),
    path('recipes/<str:pk>/', views.getRecipe, name="routes"),
    path('foods/', views.getFoods, name="routes")
]