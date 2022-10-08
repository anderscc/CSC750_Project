from django.db import models

# Create your models here.
# GA/TA table.
# TODO: Add fields to imply which semester each record belongs to.

class GATA(models.Model):
    id = models.IntegerField(primary_key = True)
    GAID = models.IntegerField() #Use this to reference GA Preference for courses and labs.
    semYr = models.CharField(max_length = 50)
    studentName = models.CharField(max_length = 100)
    hoursAvailable = models.PositiveSmallIntegerField(default=10)
    coursePref = models.CharField(max_length = 255)
    facultyPref = models.CharField(max_length = 255)
    officeHours = models.PositiveSmallIntegerField(default = 1)
    classTimes = models.CharField(max_length = 255)

class Courses(models.Model):
    id = models.IntegerField(primary_key = True)
    semYr = models.CharField(max_length = 50)
    courseCode = models.PositiveSmallIntegerField(default = 100)
    courseName = models.CharField(max_length = 255)
    courseSection = models.PositiveSmallIntegerField(default = 1)
    courseMeetTimes = models.CharField(max_length = 100)
    courseFaculty = models.CharField(max_length = 255)
    courseActivities = models.CharField(max_length = 255)
    activityTimes = models.CharField(max_length = 255)
    GAPref = models.ForeignKey('GATA', on_delete=models.CASCADE) # This needs to reference id of GATA and datatype must be changed to integer.

class Labs(models.Model):
    id = models.IntegerField(primary_key = True)
    semYr = models.CharField(max_length = 50)
    labCode = models.PositiveSmallIntegerField(default = 100)
    labName = models.CharField(max_length = 255)
    labFaculty = models.CharField(max_length = 255)
    labSection = models.PositiveSmallIntegerField(default = 1)
    labMeetTimes = models.CharField(max_length = 100)
    activityTimes = models.CharField(max_length = 255)
    GAPref = models.ForeignKey('GATA', on_delete=models.CASCADE) # This needs to reference id of GATA and datatype must be changed to integer.

class Assignment(models.Model):
    scheduleNum = models.IntegerField(primary_key = True)
    semYr = models.CharField(max_length = 50)
    id = models.ForeignKey('GATA', on_delete=models.CASCADE)
    coursesAsn = models.CharField(max_length = 255)
    hoursAsn = models.PositiveSmallIntegerField(default = 0)

class Schedules(models.Model):
    id = models.IntegerField(primary_key = True)
    semYr = models.CharField(max_length = 50)
    scheduleNum = models.ForeignKey('Assignment', on_delete=models.CASCADE)
    conflicts = models.PositiveSmallIntegerField(default = 0)