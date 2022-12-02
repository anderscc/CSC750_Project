import os

from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
import json

from .GeneticAlgorithm import Data, Population, GeneticAlgorithm, POPULATION_SIZE
from .sql import getSchedules, createSchedule, createAssignment

from .serializers import GATASerializer,CoursesSerializer, SchedulesSerializer, AssignmentSerializer, LabsSerializer, SemesterSerializer
from .models import GATA, Courses, Labs, Assignment, Schedules, SemesterYear
from pathlib import Path
import sys
path_root = Path(__file__).parents[3]
sys.path.append(str(path_root))


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


def get_schedules(request):
    id = int(request.GET.get('semYr'))
    objectQuerySet = getSchedules(id)
    data = serializers.serialize('json', list(objectQuerySet))
    return HttpResponse(json.dumps(data), content_type="application/json")

def generate_schedules(request):
    data = Data()
    generationNumber = 0
    print("\n> Generation # " + str(generationNumber))
    population = Population(POPULATION_SIZE)
    cur_schedules = population.get_schedules()
    cur_schedules.sort(key=lambda x: x.get_fitness(), reverse=True)
    geneticAlgorithm = GeneticAlgorithm()

    while (population.get_schedules()[0].get_fitness() != 1.0):
        generationNumber += 1
        print("\n> Generation # " + str(generationNumber))
        population = geneticAlgorithm.evolve(population)
        population.get_schedules().sort(key=lambda x: x.get_fitness(), reverse=True)
    schedules = population.get_schedules()

    semYr = int(request.GET.get('semYr'))
    semester = SemesterYear.objects.filter(id=semYr)
    for schedule in schedules:
        assignments = schedule.get_assignments()
        for assignment in assignments:
            new_schedule = createSchedule(semester[0], schedule.get_numbOfConflicts())
            if (new_schedule):
                createAssignment(
                    semester[0],
                    assignment.get_ga().get_studentName(),
                    assignment.get_meetingTime(),
                    assignment.get_hoursUsedGA(),
                    assignment.get_hoursAvailGA(),
                    assignment.get_course().get_Name() + " " + assignment.get_course().get_section(),
                    new_schedule
                )

                if assignment.get_ta() is not 'None':
                    createAssignment(
                        semester[0],
                        assignment.get_ta().get_studentName(),
                        assignment.get_meetingTime(),
                        assignment.get_hoursUsedTA(),
                        assignment.get_hoursAvailTA(),
                        assignment.get_course().get_Name() + " " + assignment.get_course().get_section(),
                        new_schedule
                    )
    return HttpResponse("Ok")
