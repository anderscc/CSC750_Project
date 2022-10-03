from django.shortcuts import render
from rest_framework import viewsets
from .serializers import GATASerializer,CoursesSerializer, SchedulesSerializer, AssignmentSerializer, LabsSerializer
from .models import GATA, Courses, Labs, Assignment, Schedules


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