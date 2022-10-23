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
class GATA: pass
class Course: pass
class Lab: pass

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