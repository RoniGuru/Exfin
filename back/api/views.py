from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics 
from .serializers import UserSerializer, ExpenseSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny 
from .models import Expense


# Create your views here.

class ExpenseListCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializers
    permission_classes = [IsAuthenticated] # have to be autheticated

    def get_queryset(self):
        user = self.request.user #gives user object
        return Expense.objects.filter(author=user) # filter all Expenses by user
    
    #overiding methods like get_queryset and perfrom_create for custom
    def perform_create(self, serializer):
        #checking if expense is valid 
        if serializer.is_valid():
            #create expense  add author 
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors) 


class ExpenseDelete(generics.DestroyAPIView):
    
    serializer_class = ExpenseSerializers
    permission_classes = [IsAuthenticated]

    
    def get_queryset(self):
        user = self.request.user #gives user object
        return Expense.objects.filter(author=user) # filter all Expenses by user
    
    




class CreateUserView(generics.CreateAPIView):
    # make sure not to create user that already exists by looking at all users
    queryset = User.objects.all()
    # tells view what type of data 
    serializer_class = UserSerializer
    #allow anyone to use this view
    permission_classes = [AllowAny]