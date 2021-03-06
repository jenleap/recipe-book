# Generated by Django 3.1.6 on 2021-02-12 16:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, null=True)),
                ('brand', models.CharField(max_length=200)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=7, null=True)),
                ('measure', models.CharField(max_length=50, null=True)),
                ('calories', models.IntegerField()),
                ('fat', models.IntegerField()),
                ('carbs', models.IntegerField()),
                ('protein', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=7, null=True)),
                ('food', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.food')),
                ('recipe', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.recipe')),
            ],
        ),
    ]
