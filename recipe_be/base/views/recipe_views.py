from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import json

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
    recipeData = request.data['recipe']

    data = json.loads(recipeData)

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

    if request.FILES:
        recipe.image = request.FILES.get('image')
        recipe.save()

    serializer = RecipeSerializer(recipe, many=False)

    return Response(serializer.data)

@api_view(['PUT'])
def updateRecipe(request, pk):
    data = request.data
    recipe = Recipe.objects.get(id=pk)

    recipe.name = data['name']
    recipe.description = data['description']
    recipe.servings = data['servings']

    recipe.save()

    ingredients = data['ingredients']
    steps = data['steps']

    if ingredients:
        for i in ingredients:
            ingredient = Ingredient.objects.get(id=i['id'])

            ingredient.amount = i['amount']

            ingredient.save()

    if steps:
        for s in steps:
            step = Step.objects.get(id=s['id'])

            step.description = s['description']
            step.order = s['order']

            step.save()

    serializer = RecipeSerializer(recipe, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteRecipe(request, pk):
    recipe = Recipe.objects.get(id=pk)
    recipe.delete()
    return Response("Recipe deleted.")

@api_view(['DELETE'])
def deleteIngredient(request, pk):
    ingredient = Ingredient.objects.get(id=pk)
    ingredient.delete()
    return Response("Ingredient deleted.")

@api_view(['DELETE'])
def deleteStep(request, pk):
    step = Step.objects.get(id=pk)
    step.delete()
    return Response("Step deleted.")