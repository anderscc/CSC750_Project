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

from .models import Assignment, Schedules, Courses, Labs, GATA


def createAssignment( semYr, studentName, MeetTimes, GATAhrsused, GATAHrsRem, coursesAsn, scheduleNum):
    try:
        assign = Assignment(semYr=semYr, studentName=studentName, MeetTimes=MeetTimes, GATAhrsused=GATAhrsused, GATAHrsRem=GATAHrsRem, coursesAsn=coursesAsn, scheduleNum=scheduleNum)
        assign.save()
    except Exception as e:
        print(e)
        return False
    return assign


def createSchedule(semYr, conflicts):
    try:
        sched = Schedules(semYr=semYr, conflicts=conflicts)
        sched.save()
    except Exception as e:
        # print(e)
        return False
    return sched

def getSchedules(semYr):
    schedules = Schedules.objects.filter(semYr=semYr)
    return schedules.values()

def getAssignment(semYr, schedule_id):
    assignment = Assignment.objects.filter(semYr=semYr, scheduleNum_id=schedule_id)
    return assignment

def getAssignments(semYr, oldScheduleID):
    assignments = Assignment.objects.filter(semYr=semYr, scheduleNum_id__gt = oldScheduleID).select_related('scheduleNum')
    return assignments

def getCourses(semYr):
    return Courses.objects.filter(semYr=semYr).values()

def getLabs(semYr):
    return Labs.objects.filter(semYr=semYr).values()

def getGATAs(semYr):
    return GATA.objects.filter(semYr=semYr).values()

def getGATA(id):
    return  GATA.objects.filter(id=id)


