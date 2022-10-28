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
    def __init__(self, semYr, studentName, hoursAvailable, coursePref, facultyPref, officeHours, classTimes,
                 studentType):
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
    def __init__(self, semYr, courseCode, courseName, courseSection, courseMeetTimes, courseFaculty, courseActivities,
                 activityTimes, GAPref):
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
    def __init__(self, semYr, labCode, labName, labSection, labMeetTimes, labFaculty, labActivities, activityTimes,
                 GAPref):
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


Courses = [["Fall 2022", "CSC 799", "Thesis", "001", "M 11:00 - 12:00", "DR RAZIB IQBAL", "4", "Caleb B.", ],
           ["Fall 2022", "CSC 790", "Graduate Topics in Computer Science", "001", "TW 11:00 - 12:00", "DR AJAY KATANGUR", "4", ],
           ["Fall 2022", "CSC 765", "Ubiquitous Computing and Internet of Things", "001", "F 1:00 - 2:30", "DR MUKULIKA GHOSH", "4"],
           ["Fall 2022", "CSC 755", "Software Testing and Quality Assurance", "001", "M 1:00 - 3:00", "DR LLOYD SMITH", "4",
            "Calvin A"],
           ["Fall 2022", "CSC 750", "Advanced Topics in Software Engineering", "001", "M 5:00 - 7:30", "DR RAZIB IQBAL", "4",
            "Caleb B."],
           ["Fall 2022", "CSC 747", "Multimedia Communications", "001", "R 10:00 - 12:00", "DR AJAY KATANGUR", "4", "Godwin E."],
           ["Fall 2022", "CSC 746", "Human Computer Interaction", "001", "T 4:00 - 5:15", "DR ALAA SHETA", "4"],
           ["Fall 2022", "CSC 745", "Advanced Multimedia Programming", "001", "W 9:00 - 10:15", "DR LLOYD SMITH", "4"],
           ["Fall 2022", "CSC 742", "Evolutionary Computing", "001", "TR 3:30 - 4:45", "DR ALAA SHETA", "4"],
           ["Fall 2022", "CSC 737", "Deep Learning", "001", "T 9:00 - 10:00", "DR MUKULIKA GHOSH", "4"],
           ["Fall 2022", "CSC 736", "Machine Learning", "001", "F 09:00 - 11:00", "DR AJAY KATANGUR", "4"]]

GATA = [
    ["Fall 2022", "CALVIN A.", "20", "DR RAZIB IQBAL", "CSC 750", "WR 9:00 - 10:00", "MT 5:30 - 7:30"],
    ["Fall 2022", "CALEB B.", "20", "DR ALAA SHETA", "CSC 742", "MF 9:00 - 10:00", "TR 3:30 - 4:45"],
    ["Fall 2022", "WENYU Z.", "20", "DR MUKULIKA GHOSH", "CSC 737", "R 9:00 - 10:00", "T 8:00 - 10:00"],
    ["Fall 2022", "GODWIN E.", "20", "DR AJAY KATANGUR", "CSC 736", "T 9:00 - 10:00", "F 9:00 - 11:00"],
    ["Fall 2022", "OLUWATOBI A.", "20", "DR LLOYD SMITH", "CSC 745", "M 9:00 - 10:00", "W 9:00 - 10:15"],

]

Lab = [["Fall 2022", "CSC 125", "Introduction to C++ Programming", "001", "M 1:00 - 2:30", "DR RAZIB IQBAL", "4", ""],
       ["Fall 2022", "CSC 197", "Introductory Topics in Computer Science", "001", "T 1:00 - 2:30", "DR AJAY KATANGUR", "4", ""],
       ["Fall 2022", "CSC 226", "Special Languages", "001", "W 4:00 - 500", "DR LLOYD SMITH", "4", ""],
       ["Fall 2022", "CSC 121", "Introduction to BASIC Programming", "001", "R 2:00 - 4:00", "DR MUKULIKA GHOSH", "4", ""],
       ]

def __init__(self):
        self._Courses = []; self._GATA = []; self._Lab = []
        for i in range(0, len(self.Courses)):
            self._Courses.append(Courses(self.Courses[i][0], self.Courses[i][1], self.Courses[i][2], self.Courses[i][3],self._Courses[i][4], self.Courses[i][5],))
        for i in range(0, len(self.GATA)):
            self._GATA.append(GATA(self.GATA[i][0], self.GATA[i][1], self.GATA[i][2], self.GATA[i][3], self.GATA[i][4], self.GATA[i][5],))
        for i in range(0, len(self._LAB)):
            self._Lab.append(Lab(self.Lab[i][0], self.Lab[i][1], self.Lab[i][2], self.Lab[i][3], self.Lab[i][4], self.Lab[i][5], self.Lab[i][6],))

