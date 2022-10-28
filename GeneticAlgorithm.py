# Pretty table helps with displaying output, we can use something else if it works better.
import prettytable as prettytable
# Random class.
import random as rnd
import datetime  # for time comparison

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

    # make the function more general callable
    # def get_courseMeetTimes(self): return self._courseMeetTimes
    def get_meetTimes(self): return self._courseMeetTimes

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

    # make the function more general applicable
    # def get_labMeetTimes(self): return self._labMeetTimes
    def get_meetTimes(self): return self._labMeetTimes

    def get_labFaculty(self): return self._labFaculty

    def get_labActivities(self): return self._labActivities

    def get_activityTimes(self): return self._activityTimes

    def get_GAPref(self): return self._GAPref


# TODO: Wenyu
class Schedule:
    # Define a Schedule
    def __init__(self):
        self._id = id  # id of schedule
        self._data = data
        self._numbOfConflicts = 0
        self._assignments = []  # List of course Assignment
        self._fitness = -1
        self._classNumb = 0  # id of assignment
        self._isFitnessChanged = True
        self._rewardScore = -1

    # Getting assignments, re-setting fitness changed to True.
    def get_assignments(self):
        self._isFitnessChanged = True
        return self._assignments

    # Getting fitness and number of conflicts.
    def get_numbOfConflicts(self):
        return self._numbOfConflicts

    def get_fitness(self):
        if self._isFitnessChanged:
            # Recalculate fitness for each schedule
            self._fitness = self.calculate_fitness()
            self._isFitnessChanged = False
        return self._fitness

    def get_rewardScore(self):
        return self._rewardScore

    # Function to parse meeting time string, RETURNS a list of dict
    def parse_times(self, times_string):
        # 1. Parse gata's class meeting time String eg. "MWF 09:00 - 10:00; MWF 10:00 - 11:00; W 15:00 - 17:00"
        classes_times = times_string.split(";")  # get ["MWF 09:00 - 10:00","MWF 10:00 - 11:00","W 15:00 - 17:00"]
        result = []

        for each_time in classes_times:
            list_of_each_time = each_time.split()  # get ["MWF","09:00","-","10:00"]
            days = [*list_of_each_time[0]]  # ["M","W","F]"
            start_t = datetime.datetime.strptime(list_of_each_time[1], '%H:%M')
            end_t = datetime.datetime.strptime(list_of_each_time[3], '%H:%M')
            result.append({'day': days, 'start_time': start_t,
                           'end_time': end_t})  # {'day': ["M","W","F], 'start_time': 09:00, 'end_time': 10:00}

        return result

    # Function to compare days and time
    # Parameters: class_meet_time(dict),gata_unavail_time(dict)
    def find_time_conflicts(self, class_meet_time, gata_unavail_time):
        # 1. Compare days, if days not same than safe
        if len(set(class_meet_time['day']).intersection(gata_unavail_time['day'])) > 0:
            # 2. Compare start time and end times,
            # class starts and end in between  or equal to gata's unavailable time
            if class_meet_time['start_time'] >= gata_unavail_time['start_time']:
                if class_meet_time['start_time'] <= gata_unavail_time['end_time']:
                    return True
            # class starts before unavailable time, and end after unavailable time starts
            if class_meet_time['end_time'] <= gata_unavail_time['end_time']:
                if class_meet_time['end_time'] >= gata_unavail_time['start_time']:
                    return True

        return False

    # Initializing schedule.
    def initialize(self):
        # Get lists of courses and labs
        courses = self._data.get_courses()
        labs = self._data.get_labs()
        gatas = self._data.get_gata()

        len_gata = len(gatas)

        # Iterate through all courses and labs
        # Iterate through all courses to assign a random TAGA
        for cur_course in courses:
            # Assign a random gata

            random_gata = gatas[rnd.randrange(0, len_gata)]
            newCourseAssignment = CourseAssignment(self._classNumb, random_gata)
            self._classNumb += 1
            # Setting the course, meeting time, and semester year and append it to newClass.
            newCourseAssignment.set_course(cur_course)
            newCourseAssignment.set_meetingTime(cur_course.get_courseMeetTimes())
            newCourseAssignment.set_hoursUsed(cur_course.get_activityTimes())
            newCourseAssignment.set_semYr(cur_course.get_semYr())

            self._assignment.append(newCourseAssignment)

        # Iterate through all courses
        for cur_lab in labs:
            # TODO: If this lab requires a TA, run the algorithm in the list of TA to assign a teaching TA
            #  then assign an assisting GA in the entire GATA list

            # Assign a random gata
            random_gata = gatas[rnd.randrange(0, len(gatas))]
            newCourseAssignment = CourseAssignment(self._classNumb, random_gata)
            self._classNumb += 1
            # Setting the lab, meeting time, and semester year and append it to assignment list.
            newCourseAssignment.set_course(cur_lab)
            newCourseAssignment.set_meetingTime(cur_lab.get_labMeetTimes())
            newCourseAssignment.set_hoursUsed(cur_lab.get_activityTimes())
            newCourseAssignment.set_semYr(cur_lab.get_semYr())

            self._assignment.append(newCourseAssignment)

        return self

    def calculate_fitness(self):
        # Initialize conflicts to 0
        self._numbOfConflicts = 0
        # Get classes from self
        assignments = self.get_assignments()

        # Local variable to keep track on GATA's unavailable times and remaining hours.
        gata_hours_time = {}
        name_keys = []

        # Iterate through length of assignments
        for cur_course_assignment in assignments:
            # local variables to avoid multiple callings
            cur_course = cur_course_assignment.get_course()
            cur_assigned_gata = cur_course_assignment.get_gata()
            cur_assigned_gata_name = cur_assigned_gata.get_studentName()

            # if current gata is not in the gata_hours_time (which means it is this gata's first assignment)
            if cur_assigned_gata_name not in name_keys:
                # add this gata's original data to the dict
                gata_class_times = self.parse_times(cur_assigned_gata.get_classTimes())
                gata_hours_time.update(
                    {cur_assigned_gata_name: {"remaining_hours": cur_assigned_gata.get_hoursAvailable(),
                                              "unavail_time": gata_class_times}})
                name_keys.append(cur_assigned_gata_name)

            #  Conflict 1. Compare the gata's unavailable times with class meet time
            #  Parse class time string
            cur_class_time = self.parse_times(cur_course.get_meetTimes())[0]

            # Compare class time and gata's each unavailable times
            for unavail_time in gata_hours_time[cur_assigned_gata_name]["unavail_time"]:
                if self.find_time_conflicts(cur_class_time, unavail_time):
                    self._numbOfConflicts += 1
                    # end for loop
                    break

            # Conflict 2. This gata's available hours is 0 or less; or is less than class activity times
            # can be optimized by comparing the remaining hours with 0 before getting the activicity times?
            if gata_hours_time[cur_assigned_gata_name]["remaining_hours"] < cur_course.get_activityTimes():
                self._numbOfConflicts += 1


            # Record status of this gata to gata_hours_time, to check if later assignments
            # will conflict with this assignment
            gata_hours_time[cur_assigned_gata_name]["remaining_hours"] -= cur_course.get_activityTimes()
            gata_hours_time[cur_assigned_gata_name]["unavail_time"].append({cur_class_time})

            # TODO: Calculate the rewards score for each assignments for rank of final results.


class Population:
    # Defining variables for Population of schedules.
    def __init__(self, size):
        self._size = size
        self._data = data
        self._schedules = []
        for i in range(0, size): self._schedules.append(Schedule().initialize())

    # Getting the schedules.
    def get_schedules(self): return self._schedules


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


# Creating object for hard coded data.
data = Data()
