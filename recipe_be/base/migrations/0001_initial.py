# Generated by Django 3.1.6 on 2021-02-12 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, null=True)),
                ('description', models.TextField(null=True)),
                ('servings', models.IntegerField()),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
