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

    def get_nutri_info(self):
        nutri_info = {
            "calories": 0,
            "carbs": 0,
            "protein": 0,
            "fat": 0
        }
        for i in self.ingredient_set.all():
            nutri_info['calories'] += i.get_calories()
            nutri_info['carbs'] += i.get_carbs()
            nutri_info['protein'] += i.get_protein()
            nutri_info['fat'] += i.get_fat()

        for k, v in nutri_info.items():
            nutri_info[k] = round(v / self.servings)

        return nutri_info


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

    def __str__(self):
        return str(self.food.name)

    def get_calories(self):
        return (self.food.amount * self.amount) * self.food.calories

    def get_protein(self):
        return (self.food.amount * self.amount) * self.food.protein

    def get_carbs(self):
        return (self.food.amount * self.amount) * self.food.carbs

    def get_fat(self):
        return (self.food.amount * self.amount) * self.food.fat

class Step(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.SET_NULL, null=True)
    description = models.TextField(null=True)
    order = models.IntegerField()
    