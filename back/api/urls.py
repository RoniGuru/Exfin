from django.urls import path
from . import views

# <int:pk>stands for primary key
urlpatterns = [
    path("expenses/", views.ExpenseListCreate.as_view(), name="expense-list"),
    path("expenses/delete/<int:pk>/", views.ExpenseDelete.as_view(), name="delete-expense"),
    path("expenses/update/<int:pk>/", views.ExpenseUpdate.as_view(), name="update-expense")
    
]