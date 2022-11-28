import os
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GATASerializer,CoursesSerializer, SchedulesSerializer, AssignmentSerializer, LabsSerializer, SemesterSerializer
from .models import GATA, Courses, Labs, Assignment, Schedules, SemesterYear
from pathlib import Path
import sys
path_root = Path(__file__).parents[3]
sys.path.append(str(path_root))
import GAScheduler.GeneticAlgorithm

# Create your views here.

class GATAView(viewsets.ModelViewSet):
    serializer_class = GATASerializer
    queryset = GATA.objects.all()

class CoursesView(viewsets.ModelViewSet):
    serializer_class = CoursesSerializer
    queryset = Courses.objects.all()


class LabsView(viewsets.ModelViewSet):
    serializer_class = LabsSerializer
    queryset = Labs.objects.all()

class AssignmentView(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()

class SchedulesView(viewsets.ModelViewSet):
    serializer_class = SchedulesSerializer
    queryset = Schedules.objects.all()

class SemesterView(viewsets.ModelViewSet):
    serializer_class = SemesterSerializer
    queryset = SemesterYear.objects.all()

def runAlgorithm():
    os.system('python GeneticAlgorithm.py')
    return HttpResponse("OK")