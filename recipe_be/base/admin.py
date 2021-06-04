from django.contrib import admin
from .models import Recipe, Food, Ingredient, Step

# Register your models here.

class IngredientInline(admin.StackedInline):
    model = Ingredient

class StepInline(admin.StackedInline):
    model = Step

@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'amount', 'measure']

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['name']
    inlines = [IngredientInline,StepInline,]