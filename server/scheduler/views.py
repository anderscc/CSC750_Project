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

from .GeneticAlgorithm import Data, Population, GeneticAlgorithm, POPULATION_SIZE, Schedule
from .sql import getSchedules, createSchedule, createAssignment, getGATA, getAssignments, getAssignment, getGATAs

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

    
def _optimize(schedule, semYr):
    # Fix the scheduling hours on the schedule.
    assignments = schedule.get_assignments()
    # Getting hours for GAs and TAs
    hoursForGAs = getGATAs(semYr)
    hoursByID = {}
    GAObjects = {}
    for assignment in assignments:  
        # print("GAOBJECTS", assignment.get_ga())
        if assignment.get_ga().get_id() not in GAObjects:
            GAObjects[assignment.get_ga().get_id()] = (assignment.get_ga(), 1)
        else:
            GAObjects[assignment.get_ga().get_id()] = (assignment.get_ga(), GAObjects[assignment.get_ga().get_id()][1] + 1)
        if assignment.get_ta() != "None":
            if assignment.get_ta().get_id() not in GAObjects:
                GAObjects[assignment.get_ta().get_id()] = (assignment.get_ta(), 1)
            else:
                GAObjects[assignment.get_ta().get_id()] = (assignment.get_ta(), GAObjects[assignment.get_ta().get_id()][1] + 1)
    # Grouping them all by id and student type.
    for i in range(0, len(hoursForGAs)):
        if hoursForGAs[i]['id'] not in GAObjects:
            tempObject = GATA(hoursForGAs[i]['id'], 
                              hoursForGAs[i]['semYr_id'], 
                              hoursForGAs[i]['studentName'], 
                              hoursForGAs[i]['hoursAvailable']-hoursForGAs[i]['officeHours'],
                              hoursForGAs[i]['officeHours'],
                              hoursForGAs[i]['classTimes'],
                              hoursForGAs[i]['studentType'])
            GAObjects[hoursForGAs[i]['id']] = (tempObject, 0)
        hoursByID[hoursForGAs[i]['id']] = (hoursForGAs[i]['hoursAvailable'] - hoursForGAs[i]['officeHours'], hoursForGAs[i]['studentType'], GAObjects[hoursForGAs[i]['id']][0], GAObjects[hoursForGAs[i]['id']][1])
    asnGAHours = {}
    asnTAHours = {}
    for k in range(0, len(assignments)):
        asnGAHours[assignments[k].get_ga().get_id()] = (assignments[k].get_hoursUsedGA())
        if assignments[k].get_ta() != "None":
            asnTAHours[assignments[k].get_ta().get_id()] = (assignments[k].get_hoursUsedTA())

        if assignments[k].get_ga() != "None":
            if list(asnGAHours.keys())[0] in list(hoursByID.keys()):
                GAObject = hoursByID[list(asnGAHours.keys())[0]][2]
                hoursRem = hoursByID[list(asnGAHours.keys())[0]][0]
                hoursUsed = asnGAHours[list(asnGAHours.keys())[0]]
                hoursRem = hoursRem - int(hoursUsed)
                assignments[k].set_hoursAvailGA(hoursRem)
                hoursByID[list(asnGAHours.keys())[0]] = (hoursRem, 'GA', GAObject, hoursByID[list(asnGAHours.keys())[0]][3])
                asnGAHours.pop(list(asnGAHours.keys())[0])
        if assignments[k].get_ta() != "None":
            if list(asnTAHours.keys())[0] in list(hoursByID.keys()):
                TAObject = hoursByID[list(asnTAHours.keys())[0]][2]
                hoursRem = hoursByID[list(asnTAHours.keys())[0]][0]
                hoursUsed = asnTAHours[list(asnTAHours.keys())[0]]
                hoursRem = hoursRem - int(hoursUsed)
                assignments[k].set_hoursAvailTA(hoursRem)
                hoursByID[list(asnTAHours.keys())[0]] = (hoursRem, 'TA', TAObject, hoursByID[list(asnTAHours.keys())[0]][3])
                asnTAHours.pop(list(asnTAHours.keys())[0])

    sorted_hoursByID = sorted(hoursByID.items(), key=lambda x:x[1][3])

    # Check and make a list of GAs/TAs that have hours left over and a list of over-utilized GAs/TAs.
    underUtilized = {}
    overUtilized = {}
    for l in sorted_hoursByID:
        if l[1][0] > 0:
            underUtilized[l[0]] = l[1]
        elif l[1][0] < 0:
            overUtilized[l[0]] = l[1]
    # For the over-utilized GAs/TAs, check and see if another GA/TA can use leftover hours to take the course, or if a combination of 2 GAs/TAs can take the course.
    negativeAssignments = {}
    for m in range(0, len(assignments)):
        if assignments[m].get_hoursAvailGA() < 0 or (assignments[m].get_ta() != "None" and assignments[m].get_hoursAvailTA() < 0):
            negativeAssignments[m] = assignments[m]
    for n in negativeAssignments:
        for j in underUtilized:
            GAOver = negativeAssignments[n].get_ga().get_id()
            if GAOver not in overUtilized:
                break
            else:
                if negativeAssignments[n].get_hoursAvailGA() < 0:
                    if underUtilized[j][0] - int(negativeAssignments[n].get_hoursUsedGA()) >= 0:
                        negativeAssignments[n].set_ga(hoursByID[j][2])
                        negativeAssignments[n].set_hoursAvailGA(underUtilized[j][0] - int(negativeAssignments[n].get_hoursUsedGA()))
                        assignments[n] = negativeAssignments[n]
                        hoursByID[j] = (underUtilized[j][0] - int(negativeAssignments[n].get_hoursUsedGA()), hoursByID[j][1], hoursByID[j][2], hoursByID[j][3])
                        underUtilized[j] = (underUtilized[j][0] - int(negativeAssignments[n].get_hoursUsedGA()), underUtilized[j][1], underUtilized[j][2], underUtilized[j][3]+1)
                        if len(overUtilized) > 0:
                            overUtilized[GAOver] = (overUtilized[GAOver][0] + int(negativeAssignments[n].get_hoursUsedGA()), overUtilized[GAOver][1], overUtilized[GAOver][2], overUtilized[GAOver][3]-1)
                        if underUtilized[j][3] > 3 or underUtilized[j][0] < 0:
                            del(underUtilized[j])
                        if overUtilized[GAOver][3] < 4 or overUtilized[GAOver][0] > 0:
                            del(overUtilized[GAOver])
                        break
                if negativeAssignments[n].get_ta() != "None" and negativeAssignments[n].get_hoursAvailTA() < 0:
                    if underUtilized[j][0] - int(negativeAssignments[n].get_hoursUsedTA()) >= 0:
                        negativeAssignments[n].set_ga(hoursByID[j][2])
                        negativeAssignments[n].set_hoursAvailTA(underUtilized[j][0] - int(negativeAssignments[n].get_hoursUsedTA()))
                        assignments[n] = negativeAssignments[n]
                        hoursByID[j] = (underUtilized[j][0] - int(negativeAssignments[n].get_hoursUsedTA()), hoursByID[j][1], hoursByID[j][2], hoursByID[j][3])
                        underUtilized[j] = (underUtilized[j][0] - int(negativeAssignments[n].get_hoursUsedTA()), underUtilized[j][1], underUtilized[j][2], underUtilized[j][3])
                        overUtilized[GAOver] = (overUtilized[GAOver][0] + int(negativeAssignments[n].get_hoursUsedTA()), overUtilized[GAOver][1], overUtilized[GAOver][2], overUtilized[GAOver][3])
                        if underUtilized[j][3] >= 3 or underUtilized[j][0] < 0:
                            del(underUtilized[j])
                        if overUtilized[GAOver][3] <= 4 or overUtilized[GAOver][0] > 0:
                            del(overUtilized[GAOver])
                        break
    for o in range(0, len(hoursForGAs)):
        if hoursForGAs[o]['id'] not in GAObjects:
            GAObjects[hoursForGAs[o]['id']] = ("None", 0)
        hoursByID[hoursForGAs[o]['id']] = (hoursForGAs[o]['hoursAvailable'] - hoursForGAs[o]['officeHours'], hoursForGAs[o]['studentType'], GAObjects[hoursForGAs[o]['id']][0], GAObjects[hoursForGAs[o]['id']][1])

    asnGAHours = {}
    asnTAHours = {}
    for u in range(0, len(assignments)):
        if type(assignments[u].get_ga()) == GATA:
            asnGAHours[assignments[u].get_ga().id] = (assignments[u].get_hoursUsedGA())
        else:
            asnGAHours[assignments[u].get_ga().get_id()] = (assignments[u].get_hoursUsedGA())
        if assignments[u].get_ta() != "None":
            asnTAHours[assignments[u].get_ta().get_id()] = (assignments[u].get_hoursUsedTA())
        

        if assignments[u].get_ga() != "None":
            if list(asnGAHours.keys())[0] in list(hoursByID.keys()):
                GAObject = hoursByID[list(asnGAHours.keys())[0]][2]
                hoursRem = hoursByID[list(asnGAHours.keys())[0]][0]
                hoursUsed = asnGAHours[list(asnGAHours.keys())[0]]
                hoursRem = hoursRem - int(hoursUsed)
                assignments[u].set_hoursAvailGA(hoursRem)
                hoursByID[list(asnGAHours.keys())[0]] = (hoursRem, 'GA', GAObject, hoursByID[list(asnGAHours.keys())[0]][3])
                asnGAHours.pop(list(asnGAHours.keys())[0])
        if assignments[u].get_ta() != "None":
            if list(asnTAHours.keys())[0] in list(hoursByID.keys()):
                TAObject = hoursByID[list(asnTAHours.keys())[0]][2]
                hoursRem = hoursByID[list(asnTAHours.keys())[0]][0]
                hoursUsed = asnTAHours[list(asnTAHours.keys())[0]]
                hoursRem = hoursRem - int(hoursUsed)
                assignments[u].set_hoursAvailTA(hoursRem)
                hoursByID[list(asnTAHours.keys())[0]] = (hoursRem, 'TA', TAObject, hoursByID[list(asnTAHours.keys())[0]][3])
                asnTAHours.pop(list(asnTAHours.keys())[0])
    count = 0
    for z in assignments:
        # print("Course meet time", z.get_meetingTime(), "GA Class Times", z.get_ga().get_classTimes())
        if z.get_hoursAvailGA() < 0:
            z.set_Conflict(True)
        elif z.get_ta() != "None" and z.get_hoursAvailTA() < 0:
            z.set_Conflict(True)
        if z.get_Conflict() == True:
            count+=1
    schedule.set_numbOfConflicts(count)
    # print("Current fitness number?", schedule.calculate_fitness())
    
    return schedule

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

    for schedule in schedules:
        schedule = _optimize(schedule, semYr)
        assignments = schedule.get_assignments()
        new_schedule = createSchedule(semester[0], schedule.get_numbOfConflicts())
        for i in range(0, len(assignments)):
            if (new_schedule):
                if assignments[i].get_ga() != "None":
                    # hoursUsed = assignments[i].get_hoursUsedGA() if assignments[i].get_hoursUsedGA() is not None else assignments[i].get_hoursUsedTA()
                    # hoursRem = assignments[i].get_hoursAvailGA() if assignments[i].get_hoursAvailGA() is not None else assignments[i].get_hoursAvailTA()
                    if type(assignments[i].get_ga()) == GATA:
                        ga = getGATA(assignments[i].get_ga().id)
                    else:
                        ga = getGATA(assignments[i].get_ga().get_id())
                    createAssignment(
                        semester[0],
                        ga[0],
                        assignments[i].get_meetingTime(),
                        assignments[i].get_hoursUsedGA(),
                        assignments[i].get_hoursAvailGA(),
                        assignments[i].get_course().get_Name() + " " + str(assignments[i].get_course().get_code()) + "." + str(assignments[i].get_course().get_section()),
                        assignments[i].get_Conflict(),
                        new_schedule
                    )

                if assignments[i].get_ta() != "None":
                    ta = getGATA(assignments[i].get_ta().get_id())
                    createAssignment(
                        semester[0],
                        ta[0],
                        assignments[i].get_meetingTime(),
                        assignments[i].get_hoursUsedTA(),
                        assignments[i].get_hoursAvailTA(),
                        assignments[i].get_course().get_Name() + " " + str(assignments[i].get_course().get_section()),
                        assignments[i].get_Conflict(),
                        new_schedule
                    )
    return  download_schedules(request, oldScheduleID)

