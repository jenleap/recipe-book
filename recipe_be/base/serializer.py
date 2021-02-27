from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Recipe, Food, Ingredient

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff
    
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__'

    def get_ingredients(self, obj):
        ingredients = obj.ingredient_set.all()
        serializer = IngredientSerializer(ingredients, many=True)
        return serializer.data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        data['nutri_info'] = instance.get_nutri_info()
        
        return data 

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'

class IngredientSerializer(serializers.ModelSerializer):
    food = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Ingredient
        fields = '__all__'

    def get_food(self, obj):
        food = obj.food
        serializer = FoodSerializer(food, many=False)
        return serializer.data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['calories'] = instance.get_calories()
        data['carbs'] = instance.get_carbs()
        data['protein'] = instance.get_protein()
        data['fat'] = instance.get_fat()
        return data