from django.db import models

# Create your models here.
# GA/TA table.
class GATA(models.Model):
    # Primary key is auto generated
    uidAsn = models.ForeignKey('Assignment', on_delete=models.CASCADE)
    studentName = models.CharField(max_length = 100)
    hoursAvailable = models.PositiveSmallIntegerField(default=10)
    coursePref = models.CharField(max_length = 255)
    facultyPref = models.CharField(max_length = 255)
    officeHours = models.PositiveSmallIntegerField(default = 1)
    classTimes = models.CharField(max_length = 255)

class Courses(models.Model):
    # Primary key is auto generated
    courseCode = models.PositiveSmallIntegerField(default = 100)
    courseName = models.CharField(max_length = 255)
    courseSection = models.PositiveSmallIntegerField(default = 1)
    courseMeetTimes = models.CharField(max_length = 100)
    courseFaculty = models.CharField(max_length = 255)
    courseActivities = models.CharField(max_length = 255)
    activityTimes = models.CharField(max_length = 255)
    GAPref = models.CharField(max_length = 255)

class Labs(models.Model):
    # Primary key is auto generated
    labCode = models.PositiveSmallIntegerField(default = 100)
    labName = models.CharField(max_length = 255)
    labFaculty = models.CharField(max_length = 255)
    labSection = models.PositiveSmallIntegerField(default = 1)
    labMeetTimes = models.CharField(max_length = 100)
    activityTimes = models.CharField(max_length = 255)
    GAPref = models.CharField(max_length = 255)

class Assignment(models.Model):
    scheduleNum = models.IntegerField(primary_key = True)
    uidAsn = models.PositiveSmallIntegerField(default = 1)
    coursesAsn = models.CharField(max_length = 255)
    hoursAsn = models.PositiveSmallIntegerField(default = 0)

class Schedules(models.Model):
    # Primary key is auto generated
    scheduleNum = models.ForeignKey('Assignment', on_delete=models.CASCADE)
    conflicts = models.PositiveSmallIntegerField(default = 0)