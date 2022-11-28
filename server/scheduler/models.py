from django.db import models

# Create your models here.

# GA/TA table.
class GATA(models.Model):
    id = models.AutoField(primary_key = True, editable = False, unique = True)
    semYr = models.ForeignKey('SemesterYear', on_delete=models.CASCADE)
    studentName = models.CharField(max_length = 100)
    hoursAvailable = models.PositiveSmallIntegerField(default=10)
    officeHours = models.PositiveSmallIntegerField(default = 1)
    classTimes = models.CharField(max_length = 255)
    studentType = models.CharField(max_length = 255, default="GA")
# Courses Table
class Courses(models.Model):
    id = models.AutoField(primary_key = True, editable = False, unique = True)
    semYr = models.ForeignKey('SemesterYear', on_delete=models.CASCADE)
    courseCode = models.PositiveSmallIntegerField(default = 100)
    courseName = models.CharField(max_length = 255)
    courseSection = models.PositiveSmallIntegerField(default = 1)
    courseMeetTimes = models.CharField(max_length = 100)
    courseFaculty = models.CharField(max_length = 255)
    activityTimes = models.CharField(max_length = 255)
    GAPref = models.ForeignKey('GATA', on_delete=models.CASCADE) # This needs to reference id of GATA and datatype must be changed to integer.
# Labs Table
class Labs(models.Model):
    id = models.AutoField(primary_key = True, editable = False, unique = True)
    semYr = models.ForeignKey('SemesterYear', on_delete=models.CASCADE)
    labCode = models.PositiveSmallIntegerField(default = 100)
    labName = models.CharField(max_length = 255)
    labFaculty = models.CharField(max_length = 255)
    labSection = models.PositiveSmallIntegerField(default = 1)
    labMeetTimes = models.CharField(max_length = 100)
    activityTimes = models.CharField(max_length = 255)
    GAPref = models.ForeignKey('GATA', on_delete=models.CASCADE) # This needs to reference id of GATA and datatype must be changed to integer.
    facultyTaught = models.BooleanField(default = True)
    labPrepTime = models.PositiveSmallIntegerField(default=1)
# Assignment Table
class Assignment(models.Model):
    scheduleNum = models.AutoField(primary_key = True, editable = False, unique = True)
    semYr = models.ForeignKey('SemesterYear', on_delete=models.CASCADE)
    id = models.ForeignKey('GATA', on_delete=models.CASCADE) #GA id which is refernced from GATA
    id = models.ForeignKey('GATA', on_delete=models.CASCADE) #TA id which is also referenced from GATA
    MeetTimes = models.CharField(max_length = 100)
    GAhrsused = models.PositiveSmallIntegerField(default = 0)
    TAhrsused = models.PositiveSmallIntegerField(default = 0)
    GAHrsRem = models.PositiveSmallIntegerField(default = 0)
    TAHrsRem = models.PositiveSmallIntegerField(default = 0)
    coursesAsn = models.CharField(max_length = 255)
    hoursAsn = models.PositiveSmallIntegerField(default = 0)
# Schedules Table
class Schedules(models.Model):
    id = models.AutoField(primary_key = True, editable = False, unique = True)
    semYr = models.ForeignKey('SemesterYear', on_delete=models.CASCADE)
    scheduleNum = models.ForeignKey('Assignment', on_delete=models.CASCADE)
    conflicts = models.PositiveSmallIntegerField(default = 0)
# Semester/Year Table
class SemesterYear(models.Model):
    id = models.AutoField(primary_key = True, editable = False, unique = True)
    Semester = models.CharField(max_length = 30)
    Year = models.CharField(max_length = 4)