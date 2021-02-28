from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from base.models import Recipe, Food, Ingredient, Step
from base.serializer import RecipeSerializer

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

@api_view(['POST'])
def createRecipe(request):
    data = request.data

    ingredients = data['ingredients']
    steps = data['steps']

    recipe = Recipe.objects.create(
        name=data['name'],
        description=data['description'],
        servings=data['servings']
    )

    for i in ingredients:
        food = Food.objects.get(id=i['foodId'])

        ingredient = Ingredient.objects.create(
            food=food,
            recipe=recipe,
            amount=i['amount']
        )

    for s in steps:
        step = Step.objects.create(
            recipe=recipe,
            description=s['description'],
            order=s['order']
        )

    serializer = RecipeSerializer(recipe, many=False)

    return Response(serializer.data)