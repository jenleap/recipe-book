from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Recipe, Food
from .serializer import RecipeSerializer, FoodSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/recipes',
        'api/recipes/<id>'
    ]
    return Response(routes)

@api_view(['GET'])
def getRecipes(request):
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getRecipe(request, pk):
    recipe = Recipe.objects.get(id=pk)
    serializer = RecipeSerializer(recipe, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getFoods(request):
    foods = Food.objects.all()
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data)

