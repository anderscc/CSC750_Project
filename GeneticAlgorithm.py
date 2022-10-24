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
# This class defines a courseAssignment 
# it requires the id or scheduleNumber, the GATA that it references,
# the course that is assigned, the meeting time, the semester/year, 
# hours available to be scheduled on this specific GA, 
# and how many hours this course takes up each week.
class CourseAssignment: 
    # Defining a CourseAssignment
    def __init__(self, id, gata):
        self._id = id
        self._gata = gata
        self._course = None
        self._meetingTime = None
        self._semYr = None
        # This is hours available to schedule the GA/TA.
        # Ex: GA has been scheduled for 8 hours and has a total 
        # of 20 hours to be scheduled.
        # This value would be 12 hours.
        self._hoursAvail = None
        # This is how many hours each course takes up.
        # Ex: A course requires 2 hours of work per week of a GA
        # this value would be 2.
        self._hoursUsed = None
    # Getters
    def get_id(self): return self._id
    def get_gata(self): return self._gata
    def get_course(self): return self._course
    def get_meetingTime(self): return self._meetingTime
    def get_semYr(self): return self._semYr
    def get_hoursAvail(self): return self._hoursAvail
    def get_hoursUsed(self): return self._hoursAvail
    # Setters
    def set_hoursUsed(self, hoursUsed): self._hoursUsed = hoursUsed
    def set_hoursAvail(self, hoursAvail): self._hoursAvail = hoursAvail
    def set_semYr(self, semYr): self._semYr = semYr
    def set_course(self, course): self._course = course
    def set_meetingTime(self, meetingTime): self._meetingTime = meetingTime


# TODO: Tobi
class Data: pass