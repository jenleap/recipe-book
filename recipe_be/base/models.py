from django.db import models

# Create your models here.

class Recipe(models.Model):
    name = models.CharField(max_length=200, null=True)
    image = models.ImageField(null=True, blank=True)
    description = models.TextField(null=True)
    servings = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Food(models.Model):
    name = models.CharField(max_length=200, null=True)
    brand = models.CharField(max_length=200, null=False)
    amount = models.DecimalField(max_digits=7, decimal_places=2, null=True)
    measure = models.CharField(max_length=50, null=True)
    calories = models.IntegerField()
    fat = models.IntegerField()
    carbs = models.IntegerField()
    protein = models.IntegerField()

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=7, decimal_places=2, null=True)