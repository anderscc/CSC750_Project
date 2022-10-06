from django.shortcuts import render, redirect
from .models import *
from .forms import *
# Create your views here.

def add_gata(request):
    form = AddGA_TA
    
    if request.method == 'POST':
        form = AddGA_TA(request.POST)
        if form.is_valid():
            form.save()
            #redirect('home') //redirect to any page you wish to send the user after registration 
    context = {'form':form}
    return render(request, '#', context)

def add_course(request):
    form = AddCourses
    
    if request.method == 'POST':
        form = AddCourses(request.POST)
        if form.is_valid():
            form.save()
            #redirect('home') //redirect to any page you wish to send the user after registration 
    context = {'form':form}
    return render(request, '#', context)

def add_labs(request):
    form = AddLabs
    
    if request.method == 'POST':
        form = AddLabs(request.POST)
        if form.is_valid():
            form.save()
            #redirect('home') //redirect to any page you wish to send the user after registration 
    context = {'form':form}
    return render(request, '#', context)

def add_assignment(request):
    form = AddAssignment
    
    if request.method == 'POST':
        form = AddAssignment(request.POST)
        if form.is_valid():
            form.save()
            #redirect('home') //redirect to any page you wish to send the user after registration 
    context = {'form':form}
    return render(request, '#', context)

def add_schedule(request):
    form = AddSchedules
    
    if request.method == 'POST':
        form = AddSchedules(request.POST)
        if form.is_valid():
            form.save()
            #redirect('home') //redirect to any page you wish to send the user after registration 
    context = {'form':form}
    return render(request, '#', context)