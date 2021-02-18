from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getRoutes, name="routes"),
    path('recipes/', views.getRecipes, name="routes"),
    path('recipes/<str:pk>/', views.getRecipe, name="routes"),
    path('foods/', views.getFoods, name="routes")
]