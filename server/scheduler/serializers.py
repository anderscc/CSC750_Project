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

from rest_framework import serializers
from .models import GATA, Courses, Labs, Assignment, Schedules, SemesterYear


class GATASerializer(serializers.ModelSerializer):
    class Meta:
        model = GATA
        fields = ('id', 'studentName','semYr','hoursAvailable', 'officeHours', 'classTimes', 'studentType')


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ('id', 'semYr', 'courseCode', 'courseName', 'courseSection', 'courseMeetTimes', 'courseFaculty',
                  'activityTimes', 'GAPref')


class LabsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labs
        fields = ('id', 'semYr','labCode', 'labName', 'labFaculty', 'labSection', 'labMeetTimes', 'activityTimes', 'GAPref', 'facultyTaught','labPrepTime')


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('AssignmentID', 'semYr','studentName', 'MeetTimes', 'GATAhrsused', 'GATAHrsRem','coursesAsn','scheduleNum')


class SchedulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedules
        fields = ('id', 'semYr', 'conflicts')

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = SemesterYear
        fields = ('id', 'Semester', 'Year')