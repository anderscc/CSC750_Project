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