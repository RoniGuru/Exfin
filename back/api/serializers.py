from django.contrib.auth.models import User
from rest_framework import serializers
from.models import Expense

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password":{"write_only":True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ExpenseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Expense 
        fields = ["id", "title", "cost", "date", "author"]
        extra_kwargs = {"author": {"read_only":True}} # can only see author not set them
