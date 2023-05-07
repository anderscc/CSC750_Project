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

from django.db import models

# Create your models here.

# GA/TA table.
class GATA(models.Model):
    id = models.AutoField(primary_key = True, editable = False, unique = True)
    semYr = models.ForeignKey('SemesterYear', on_delete=models.CASCADE)
    studentName = models.CharField(max_length = 100, unique = True)
    hoursAvailable = models.PositiveSmallIntegerField(default=10)
    officeHours = models.PositiveSmallIntegerField(default = 1)
    classTimes = models.CharField(max_length = 255, default = None)
    studentType = models.CharField(max_length = 255, default="GA")
# Courses Table
class Courses(models.Model):
    id = models.AutoField(primary_key = True, editable = False, unique = True)
    semYr = models.ForeignKey('SemesterYear', on_delete=models.CASCADE)
    courseCode = models.PositiveSmallIntegerField(default = 100)
    courseName = models.CharField(max_length = 255)
    courseSection = models.CharField(max_length = 255)
    courseMeetTimes = models.CharField(max_length = 100)
    courseFaculty = models.CharField(max_length = 255)
    activityTimes = models.CharField(max_length = 255)
    GAPref = models.ForeignKey('GATA', on_delete=models.CASCADE, default=None, blank=True, null=True) # This needs to reference id of GATA and datatype must be changed to integer.
# Labs Table
class Labs(models.Model):
    id = models.AutoField(primary_key = True, editable = False, unique = True)
    semYr = models.ForeignKey('SemesterYear', on_delete=models.CASCADE)
    labCode = models.PositiveSmallIntegerField(default = 100)
    labName = models.CharField(max_length = 255)
    labFaculty = models.CharField(max_length = 255)
    labSection = models.CharField(max_length = 255)
    labMeetTimes = models.CharField(max_length = 100)
    activityTimes = models.CharField(max_length = 255)
    GAPref = models.ForeignKey('GATA', on_delete=models.CASCADE, default=None, blank=True, null=True) # This needs to reference id of GATA and datatype must be changed to integer.
    facultyTaught = models.BooleanField(default = True)
    labPrepTime = models.PositiveSmallIntegerField(default=0)
# Assignment Table
class Assignment(models.Model):
    AssignmentID = models.AutoField(primary_key = True, editable = False, unique = True)
    semYr = models.ForeignKey('SemesterYear', on_delete=models.CASCADE)
    studentName = models.ForeignKey('GATA', on_delete=models.CASCADE, default=None, to_field="studentName") #GA id which is refernced from GATA
    MeetTimes = models.CharField(max_length = 100, default=None)
    GATAhrsused = models.FloatField(default = 0.0)
    GATAHrsRem = models.FloatField(default = 0.0)
    coursesAsn = models.CharField(max_length = 255)
    scheduleNum = models.ForeignKey('Schedules', on_delete=models.CASCADE)
    Conflict = models.BooleanField(default = False)
# Schedules Table
class Schedules(models.Model):
    id = models.AutoField(primary_key = True, editable = False, unique = True)
    semYr = models.ForeignKey('SemesterYear', on_delete=models.CASCADE)
    conflicts = models.PositiveSmallIntegerField(default = 0)
# Semester/Year Table
class SemesterYear(models.Model):
    id = models.AutoField(primary_key = True, editable = False, unique = True)
    Semester = models.CharField(max_length = 30)
    Year = models.CharField(max_length = 4)