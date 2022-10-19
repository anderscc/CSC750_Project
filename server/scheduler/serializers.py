from rest_framework import serializers
from .models import GATA, Courses, Labs, Assignment, Schedules, SemesterYear


class GATASerializer(serializers.ModelSerializer):
    class Meta:
        model = GATA
        fields = ('id', 'studentName','semYr','hoursAvailable', 'coursePref', 'facultyPref', 'officeHours', 'classTimes', 'studentType')


class CoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ('id', 'id', 'semYr', 'courseCode', 'courseName', 'courseSection', 'courseMeetTimes', 'courseFaculty', 'courseActivities',
                  'activityTimes', 'GAPref')


class LabsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labs
        fields = ('id', 'semYr','labCode', 'labName', 'labFaculty', 'labSection', 'labMeetTimes', 'activityTimes', 'GAPref')


class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ('id', 'semYr','scheduleNum', 'id', 'coursesAsn', 'hoursAsn')


class SchedulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedules
        fields = ('id', 'semYr','scheduleNum', 'conflicts')

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = SemesterYear
        fields = ('id', 'Semester', 'Year')