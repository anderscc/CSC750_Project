from rest_framework import serializers
from .models import GATA, Courses, Labs, Assignment, Schedules


class GATASerializer(serializers.ModelSerializer):
    class Meta:
        model = GATA
        fields = ('GAID', 'studentName', 'hoursAvailable', 'coursePref', 'facultyPref', 'officeHours', 'classTimes')


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ('courseCode', 'courseName', 'courseSection', 'courseMeetTimes', 'courseFaculty', 'courseActivities',
                  'activityTimes', 'GAPref')


class LabsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labs
        fields = ('labCode', 'labName', 'labFaculty', 'labSection', 'labMeetTimes', 'activityTimes', 'GAPref')


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('scheduleNum', 'GAID', 'coursesAsn', 'hoursAsn')


class SchedulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedules
        fields = ('scheduleNum', 'conflicts')
