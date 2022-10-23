# Pretty table helps with displaying output, we can use something else if it works better.
import prettytable as prettytable
# Random class.
import random as rnd
# Defined population size.
POPULATION_SIZE = 9
# We select the top schedule given a generation.
NUMB_OF_ELITE_SCHEDULES = 1
# Select the best 3, compared based on number of conflicts and weights for GATA pref/Course pref.
TOURNAMENT_SELECTION_SIZE = 3
# Defined mutation rate.
MUTATION_RATE = 0.1

# TODO: [For Godwin] Define class for GA/TA, Course, and Lab.
# TODO: [For Wenyu] Define class for Schedule and Population.
# TODO: [For Calvin] Define class for MeetingTime and DisplayMgr.
# TODO: [For Caleb] Define class for Class and Genetic Algorithm.
# TODO: [For Tobi] Define class for Data and Define hard coded test data.

# TODO: Godwin
class GATA:
    # define variables for a course.
    def __init__(self, semYr, studentName, hoursAvailable, coursePref, facultyPref, officeHours, classTimes, studentType ):
        self._semYr = semYr
        self._studentName = studentName
        self._hoursAvailable = hoursAvailable
        self._facultyPref = facultyPref
        self._coursePref = coursePref
        self._officeHours = officeHours
        self._classTimes = classTimes
        self._studentType = studentType
    # Getters.
    def get_semYr(self): return self._semYr
    def get_studentName(self): return self._studentName
    def get_hoursAvailable(self): return self._hoursAvailable
    def get_facultyPref(self): return self._facultyPref
    def get_coursePref(self): return self._coursePref
    def get_officeHours(self): return self._officeHours
    def get_classTimes(self): return self._classTimes
    def get_studentType(self): return self._studentType

    def __str__(self): return self._name
class Course:
    def __init__(self, semYr, courseCode, courseName, courseSection, courseMeetTimes, courseFaculty, courseActivities, activityTimes, GAPref):
        self._semYr = semYr
        self._courseCode = courseCode
        self._courseName = courseName
        self._courseSection = courseSection
        self._courseMeetTimes = courseMeetTimes
        self._courseFaculty = courseFaculty
        self._courseActivities = courseActivities
        self._activityTimes = activityTimes
        self._GAPref = GAPref
    # Getters.
    def get_semYr(self): return self._semYr
    def get_courseCode(self): return self._courseCode
    def get_courseName(self): return self._courseName
    def get_courseSection(self): return self._courseSection
    def get_courseMeetTimes(self): return self._courseMeetTimes
    def get_courseFaculty(self): return self._courseFaculty
    def get_courseActivities(self): return self._courseActivities
    def get_activityTimes(self): return self._activityTimes
    def get_GAPref(self): return self._GAPref

    def __str__(self): return self._name
class Lab:
    def __init__(self, semYr, labCode, labName, labSection, labMeetTimes, labFaculty, labActivities, activityTimes, GAPref):
        self._semYr = semYr
        self._labCode = labCode
        self._labName = labName
        self._labSection = labSection
        self._labMeetTimes = labMeetTimes
        self._labFaculty = labFaculty
        self._labActivities = labActivities
        self._activityTimes = activityTimes
        self._GAPref = GAPref
    # Getters.
    def get_semYr(self): return self._semYr
    def get_labCode(self): return self._labCode
    def get_labName(self): return self._labName
    def get_labSection(self): return self._labSection
    def get_labMeetTimes(self): return self._labMeetTimes
    def get_labFaculty(self): return self._labFaculty
    def get_labActivities(self): return self._labActivities
    def get_activityTimes(self): return self._activityTimes
    def get_GAPref(self): return self._GAPref

# TODO: Wenyu
class Schedule: pass
class Population: pass

# TODO: Calvin
class MeetingTime: pass
class DisplayMgr: pass

# Leave for Last, this class defines our genetic algorithm.
# TODO: Caleb but also all of us.
class GeneticAlgorithm: pass
class Class: pass

# TODO: Tobi
class Data: pass