# Copyright (c) 2022 Caleb Bryant, Wenyu Zhao, Calvin Anderson, Godwin Ekuma, Oluwatobi Atolagbe
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE

import os

from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
import json
import ast

from .GeneticAlgorithm import Data, Population, GeneticAlgorithm, POPULATION_SIZE
from .sql import getSchedules, createSchedule, createAssignment, getGATA, getAssignments, getAssignment, getGATAHours, getGATAs

from .serializers import GATASerializer,CoursesSerializer, SchedulesSerializer, AssignmentSerializer, LabsSerializer, SemesterSerializer
from .models import GATA, Courses, Labs, Assignment, Schedules, SemesterYear
from pathlib import Path
import sys
import pandas as pd
from datetime import date
import mimetypes



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

def download_schedules(request, oldScheduleID):
    semYr = int(request.GET.get('semYr'))
    query_sets = getAssignments(semYr, oldScheduleID)
    assignment_records = query_sets.values()
    for index, _ in enumerate(assignment_records):
        assignment_records[index]['conflicts'] = query_sets[index].scheduleNum.conflicts


    assignment_groups = {}
    for item in assignment_records:
        assignment_groups.setdefault(item['scheduleNum_id'], []).append(item)

    excel_file_name = 'GAS_Schedules' + str(date.today()) + '.xlsx'
    writer = pd.ExcelWriter(excel_file_name, engine='xlsxwriter')
    sheet_counter = 1

    for assignment in assignment_groups:
        data_name = "Schedule " + str(sheet_counter)
        df = pd.DataFrame(assignment_groups[assignment])
        df.to_excel(writer, sheet_name=data_name)
        sheet_counter += 1
    writer.save()

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # Define text file name
    filename = excel_file_name
    # Define the full file path
    filepath = BASE_DIR  + "/" + filename
    # Open the file for reading content
    # path = open(filepath, 'r')
    with open(filepath, "rb") as excel:
        data = excel.read()
        mime_type, _ = mimetypes.guess_type(filepath)
        # Set the return value of the HttpResponse
        response = HttpResponse(data, content_type=mime_type)
        # Set the HTTP header for sending to browser
        response['Content-Disposition'] = "attachment; filename=%s" % filename
        # Return the response value

    # Set the mime type

    return response

def download_schedule(request):
    semYr = int(request.GET.get('semYr'))
    schedule_id = int(request.GET.get('schedule_id'))
    query_sets = getAssignment(semYr, schedule_id)
    schedule = query_sets.values()

    for index, _ in enumerate(schedule):
        schedule[index]['conflicts'] = query_sets[index].scheduleNum.conflicts


    excel_file_name = 'GAS_Schedules' + str(date.today()) + '.xlsx'
    writer = pd.ExcelWriter(excel_file_name, engine='xlsxwriter')

    data_name = "Schedule " + str(schedule_id)
    df = pd.DataFrame(schedule)
    df.to_excel(writer, sheet_name=data_name)
    writer.save()

    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # Define text file name
    filename = excel_file_name
    # Define the full file path
    filepath = BASE_DIR  + "/" + filename
    # Open the file for reading content
    # path = open(filepath, 'r')
    with open(filepath, "rb") as excel:
        data = excel.read()
        mime_type, _ = mimetypes.guess_type(filepath)
        print("mime_type:  ", mime_type)
        # Set the return value of the HttpResponse
        response = HttpResponse(data, content_type=mime_type)
        # Set the HTTP header for sending to browser
        response['Content-Disposition'] = "attachment; filename=%s" % filename
        # Return the response value

    # Set the mime type

    return response

def generate_schedules(request):
    generationNumber = 0
    semYr = request.GET.get('semYr')
    if(getSchedules(semYr).count() != 0):
        oldScheduleID = getSchedules(semYr).latest('id')['id']
    else:
        oldScheduleID = 0
    population = Population(POPULATION_SIZE, semYr)
    cur_schedules = population.get_schedules()
    cur_schedules.sort(key=lambda x: x.get_fitness(), reverse=True)
    geneticAlgorithm = GeneticAlgorithm()

    while (population.get_schedules()[0].get_fitness() != 1.0 and generationNumber < 1000):
        generationNumber += 1
        population = geneticAlgorithm.evolve(population, semYr)
        population.get_schedules().sort(key=lambda x: x.get_fitness(), reverse=True)
        if (generationNumber % 100 == 0):
            print(generationNumber)
    schedules = population.get_schedules()

    semester = SemesterYear.objects.filter(id=semYr)
    # Getting hours for GAs and TAs
    hoursForGAs = getGATAs(semYr)
    hoursByID = {}
    # Grouping them all by id and student type.
    for i in range(0, len(hoursForGAs)):
        hoursByID[hoursForGAs[i]['id']] = (hoursForGAs[i]['hoursAvailable'] - hoursForGAs[i]['officeHours'], hoursForGAs[i]['studentType'])
    
    f = open("dict.txt", "w")
    f.write(str(hoursByID))
    f.close()

    for schedule in schedules:
        with open('dict.txt') as r:
            backup = r.read()
        convertToDict = ast.literal_eval(backup)
        hoursByID = convertToDict
        r.close()

        # Group all assignments by id.
        assignments = schedule.get_assignments()
        asnGAHours = {}
        asnTAHours = {}
        new_schedule = createSchedule(semester[0], schedule.get_numbOfConflicts())
        for i in range(0, len(assignments)):
            asnGAHours[assignments[i].get_ga().get_id()] = (assignments[i].get_hoursUsedGA())
            if assignments[i].get_ta() != "None":
                asnTAHours[assignments[i].get_ta().get_id()] = (assignments[i].get_hoursUsedTA())
            if (new_schedule):
                hoursRem = 0
                hoursUsed = 0
                if assignments[i].get_ga() != "None":
                    if list(asnGAHours.keys())[0] in list(hoursByID.keys()):
                        hoursRem = hoursByID[list(asnGAHours.keys())[0]][0]
                        hoursUsed = asnGAHours[list(asnGAHours.keys())[0]]
                        hoursRem = hoursRem - int(hoursUsed)
                        hoursByID[list(asnGAHours.keys())[0]] = (hoursRem, 'GA')
                        asnGAHours.pop(list(asnGAHours.keys())[0])


                    ga = getGATA(assignments[i].get_ga().get_id())
                    createAssignment(
                        semester[0],
                        ga[0],
                        assignments[i].get_meetingTime(),
                        hoursUsed,
                        hoursRem,
                        assignments[i].get_course().get_Name() + " " + str(assignments[i].get_course().get_code()) + "." + str(assignments[i].get_course().get_section()),
                        new_schedule
                    )

                if assignments[i].get_ta() != "None":
                    if list(asnTAHours.keys())[0] in list(hoursByID.keys()):
                        hoursRem = hoursByID[list(asnTAHours.keys())[0]][0]
                        hoursUsed = asnTAHours[list(asnTAHours.keys())[0]]
                        hoursRem = hoursRem - int(hoursUsed)
                        hoursByID[list(asnTAHours.keys())[0]] = (hoursRem, 'GA')
                        asnTAHours.pop(list(asnTAHours.keys())[0])

                    ta = getGATA(assignments[i].get_ta().get_id())
                    createAssignment(
                        semester[0],
                        ta[0],
                        assignments[i].get_meetingTime(),
                        assignments[i].get_hoursUsedTA(),
                        assignments[i].get_hoursAvailTA(),
                        assignments[i].get_course().get_Name() + " " + str(assignments[i].get_course().get_section()),
                        new_schedule
                    )
    return  download_schedules(request, oldScheduleID)

