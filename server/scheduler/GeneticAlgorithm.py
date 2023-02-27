# Copyright (c) 2022 Caleb Bryant, Wenyu Zhao, Calvin Anderson, Godwin Ekuma, Oluwatobi Atolagbe
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE

# Pretty table helps with displaying output, we can use something else if it works better.
import prettytable as prettytable

# Random class.
import random as rnd
import datetime  # for time comparison
import time
from .sql import getGATAs, getCourses, getLabs

# Defined population size.
POPULATION_SIZE = 9
# We select the top schedule given a generation.
NUMB_OF_ELITE_SCHEDULES = 1
# Select the best 3, compared based on number of conflicts and weights for GATA pref/Course pref.
TOURNAMENT_SELECTION_SIZE = 3
# Defined mutation rate.
MUTATION_RATE = 0.1

"""
Methods: 
    Getter: 
        get_semYr
        get_studentName
        get_hoursAvailable
        get_facultyPref
        get_coursePref
        get_officeHours
        get_classTimes
        get_studentType
    Setter: 
"""


class GATA:
    # define variables for a course.
    def __init__(self,
                 id,
                 semYr,
                 studentName,
                 hoursAvailable,
                 officeHours,
                 classTimes,
                 studentType
                 ):
        self._id = id
        self._semYr = semYr
        self._studentName = studentName
        self._hoursAvailable = hoursAvailable
        self._officeHours = officeHours
        self._classTimes = classTimes
        self._studentType = studentType

    # Getters.
    def get_id(self): return self._id

    def get_semYr(self): return self._semYr

    def get_studentName(self):
        return self._studentName

    def get_hoursAvailable(self):
        return self._hoursAvailable

    def get_officeHours(self): return self._officeHours

    def get_classTimes(self):
        return self._classTimes

    def get_studentType(self):
        return self._studentType

    def set_hoursAvailable(self, hours): self._hoursAvailable = hours

    def __str__(self): return self._studentName


"""
Methods:
    Getters:
        get_semYr
        get_courseCode
        get_courseName
        get_courseSection
        get_meetTimes
        get_courseFaculty
        get_activityTimes
        get_GAPref
    Setters:
"""


class Course:
    def __init__(
        self,
        semYr,
        courseCode,
        courseName,
        courseSection,
        courseMeetTimes,
        courseFaculty,
        activityTimes,
        GAPref,
    ):
        self._semYr = semYr
        self._courseCode = courseCode
        self._courseName = courseName
        self._courseSection = courseSection
        self._courseMeetTimes = courseMeetTimes
        self._courseFaculty = courseFaculty
        self._activityTimes = activityTimes
        self._GAPref = GAPref

    # Getters.
    def get_semYr(self):
        return self._semYr

    def get_code(self):
        return self._courseCode

    # Generalize function name.
    def get_Name(self): return self._courseName

    def get_section(self):
        return self._courseSection

    # make the function more general callable
    # def get_courseMeetTimes(self): return self._courseMeetTimes
    def get_meetTimes(self):
        return self._courseMeetTimes

    def get_courseFaculty(self):
        return self._courseFaculty

    def get_activityTimes(self):
        return self._activityTimes

    def get_GAPref(self):
        return self._GAPref

    def __str__(self):
        return self._courseName


"""
Methods:
    Getters:
        get_semYr
        get_labCode
        get_labName
        get_labSection
        get_meetTimes
        get_labFaculty
        get_activityTimes
        get_GAPref
        get_facultyTaught
    Setters:

"""


class Lab:
    def __init__(self,
                 semYr,
                 labCode,
                 labName,
                 labSection,
                 labMeetTimes,
                 labFaculty, activityTimes,
                 GAPref,
                 facultyTaught,
                 prepTime
                 ):
        self._semYr = semYr
        self._labCode = labCode
        self._labName = labName
        self._labSection = labSection
        self._labMeetTimes = labMeetTimes
        self._labFaculty = labFaculty
        self._activityTimes = activityTimes
        self._GAPref = GAPref
        self._facultyTaught = facultyTaught
        self._prepTime = prepTime

    # Getters.
    def get_semYr(self):
        return self._semYr

    def get_code(self):
        return self._labCode

    def get_Name(self):
        return self._labName

    def get_section(self):
        return self._labSection

    # make the function more general applicable
    # def get_labMeetTimes(self): return self._labMeetTimes
    def get_meetTimes(self):
        return self._labMeetTimes

    def get_labFaculty(self):
        return self._labFaculty

    def get_activityTimes(self):
        return self._activityTimes

    def get_GAPref(self):
        return self._GAPref

    def set_GAPref(self, GAPref):
        self._GAPref = GAPref

    def get_facultyTaught(self):
        return self._facultyTaught

    def get_prepTime(self): return self._prepTime

    def __str__(self): return self._labName

"""
Methods:
    Getter:
        get_assignments
        get_numbOfConflicts
        get_fitness
        get_rewardScore
    Setter:
"""


class Schedule:
    # Define a Schedule
    def __init__(self, data):
        self._id = id  # id of schedule
        self._data = data
        self._numbOfConflicts = 0
        self._assignments = []  # List of course Assignment
        self._fitness = -1
        self._classNumb = 0  # id of assignment
        self._isFitnessChanged = True
        self._rewardScore = 0

    # Getting assignments, re-setting fitness changed to True.
    def get_assignments(self):
        self._isFitnessChanged = True
        return self._assignments

    # Getting fitness and number of conflicts.
    def get_numbOfConflicts(self):
        return self._numbOfConflicts

    def get_fitness(self):
        if self._isFitnessChanged == True:
            # Recalculate fitness for each schedule
            self._fitness = self.calculate_fitness()
            # print("Number of conflicts for current schedule:",self._fitness)
            self._isFitnessChanged = False
        return self._fitness

    def get_rewardScore(self):
        return self._rewardScore

    # Function to parse meeting time string, RETURNS a list of dict
    def parse_times(self, times_string):
        # Add code here to check if the course is an online course.
        # If time_string == "Online":
            # return "Online"
        # 1. Parse gata's class meeting time String eg. "MWF 09:00 - 10:00; MWF 10:00 - 11:00; W 15:00 - 17:00"
        classes_times = times_string.split(
            ";"
        )  # get ["MWF 09:00 - 10:00","MWF 10:00 - 11:00","W 15:00 - 17:00"]
        result = []

        for each_time in classes_times:
            list_of_each_time = each_time.split()  # get ["MWF","09:00","-","10:00"]
            days = [*list_of_each_time[0]]  # ["M","W","F]"
            start_t = datetime.datetime.strptime(list_of_each_time[1], "%H:%M")
            end_t = datetime.datetime.strptime(list_of_each_time[3], "%H:%M")
            result.append(
                {"day": days, "start_time": start_t, "end_time": end_t}
            )  # {'day': ["M","W","F], 'start_time': 09:00, 'end_time': 10:00}

        return result

    # Function to compare days and time
    # Parameters: class_meet_time(dict),gata_unavail_time(dict)
    def find_time_conflicts(self, class_meet_time, gata_unavail_time):
        # 1. Compare days, if days not same than safe
        if len(set(class_meet_time["day"]).intersection(gata_unavail_time["day"])) > 0:
            # 2. Compare start time and end times,
            # class starts and end in between  or equal to gata's unavailable time
            if class_meet_time['start_time'] >= gata_unavail_time['start_time'] and class_meet_time['start_time'] <= gata_unavail_time['end_time']:
                return True
            # class starts before unavailable time, and end after unavailable time starts
            if class_meet_time["end_time"] <= gata_unavail_time["end_time"]:
                if class_meet_time["end_time"] >= gata_unavail_time["start_time"]:
                    return True

        return False

    # This compares GA Preferences, it's a generalized function that works with courses or labs.
    def compare_GAPref(self, CourseLab, GATAList):
        for GA in GATAList:
            # Testing/Troubleshooting
            # print(type(CourseLab.get_GAPref()), type(GA.get_id()))
            # prfloat(courseLab.get_GAPref(), GA.get_id())
            if (CourseLab.get_GAPref() == GA.get_id()):
                return GA

    def getAssignmentNames(self):
        currentTAs = self.get_assignments()
        temp = []
        for i in range(0, len(currentTAs)):
            if currentTAs[i].get_ta() == "None":
                continue
            elif currentTAs[i].get_ta().get_studentName() != "None":
                temp.append(currentTAs[i].get_ta().get_studentName())
        return temp


        # Initializing schedule.
    def initialize(self):
        # Gets all data from data class.
        courses = self._data.get_courses()
        labs = self._data.get_labs()
        gatas = self._data.get_gata()
        # List of GAs.
        GAList = []
        # List of TAs.
        TAList = []
        # List of courses with a GA Preference.
        CourseGAPref = []
        # List of courses without a GA Preference.
        CourseNonGAPref = []
        # List of Labs with a TA Preference.
        # If lab has same name and different section number as this lab and is faculty taught, get preferred TA from this lab and set preferred TA on faculty taught lab and append to facultyTaught list. Assign TAs as GAs like normal.
        LabTAPref = []
        # List of Labs with no TA Preference.
        LabNoTAPref = []
        # List of Labs that are faculty Taught
        LabFacultyTaughtTA = []

        LabFacultyTaughtNoTA = []

        # Iterates through gatas to sort by student type.
        for i in gatas:
            if(i.get_studentType() == 'GA'): 
                GAList.append(i)
                # OriginalHours.append((i.get_hoursAvailable(), i.get_id()))
            elif(i.get_studentType() == 'TA'): 
                TAList.append(i)
            elif(i.get_studentType() == ''): 
                print("This student does not have a student Type.")
            else: 
                print("This students type is not valid.")
        # Iterates through courses to sort by GA Preference or No GA Preference
        for course in courses:
            if(course.get_GAPref() is None): CourseNonGAPref.append(course)
            elif(course.get_GAPref() != None): CourseGAPref.append(course)
        # Iterates through labs to sort by TA Preference or No TA Preference
        for lab in labs:
            if(lab.get_GAPref() is None and not lab.get_facultyTaught()): LabNoTAPref.append(lab)
            elif(lab.get_GAPref() != None): LabTAPref.append(lab)
            else: LabFacultyTaughtNoTA.append(lab)
        # Checking if labs in LabNoTAPref need to have the TA from LabTAPref assigned to this lab, if facultyTaught.
        for i in reversed(range(0, len(LabNoTAPref))):
            cur_lab = LabNoTAPref[i]
            for j in range(0, len(LabTAPref)):
                if cur_lab.get_Name() == LabTAPref[j].get_Name() and cur_lab.get_section() != LabTAPref[j].get_section() and cur_lab.get_facultyTaught():
                    TAPref = LabTAPref[j].get_GAPref()
                    cur_lab.set_GAPref(TAPref)
                    LabFacultyTaughtTA.append(cur_lab)
                    LabNoTAPref.remove(cur_lab)
        # Assigning Labs that have TA preferences to preferred TAs and are not faculty taught.
        randomGAStart = rnd.randrange(0, len(GAList))
        randomTAStart = rnd.randrange(0, len(TAList))
        for cur_lab in LabTAPref:
            if randomGAStart > len(GAList)-1:
                randomGAStart = 0
            # Assign TA to teach the lab.
            TA = self.compare_GAPref(cur_lab, TAList)
            # Assign GA to grade the lab.
            GA = GAList[randomGAStart]
            randomGAStart +=1
            newCourseAssignment = CourseAssignment(self._classNumb, GA)
            newCourseAssignment.set_ta(TA)
            self._classNumb += 1
            # Setting the lab, meeting time, and semester year and append it to assignment list.
            newCourseAssignment.set_course(cur_lab)
            newCourseAssignment.set_meetingTime(cur_lab.get_meetTimes())
            newCourseAssignment.set_semYr(cur_lab.get_semYr())
            # Setting Hours Used for each GA and TA assigned to this course.
            newCourseAssignment.set_hoursUsedTA(int(cur_lab.get_activityTimes()) + cur_lab.get_prepTime())
            newCourseAssignment.set_hoursUsedGA(cur_lab.get_activityTimes())
            TAHours = TA.get_hoursAvailable() - newCourseAssignment.get_hoursUsedTA()
            GAHours = GA.get_hoursAvailable() - int(newCourseAssignment.get_hoursUsedGA())
            GA.set_hoursAvailable(GAHours)
            TA.set_hoursAvailable(TAHours)
            newCourseAssignment.set_hoursAvailGA(GA.get_hoursAvailable())
            newCourseAssignment.set_hoursAvailTA(TA.get_hoursAvailable())

            self._assignments.append(newCourseAssignment)
        # Assigning Labs that don't have a TA preference to TAs and are faculty taught.
        for cur_lab in LabNoTAPref:
            if randomTAStart > len(TAList)-1:
                randomTAStart = 0
            if randomGAStart > len(GAList)-1:
                randomGAStart = 0
            # Assign a pseudoRandom TA
            TA = TAList[randomTAStart]
            randomTAStart += 1
            GA = GAList[randomGAStart]
            randomGAStart += 1
            newCourseAssignment = CourseAssignment(self._classNumb, GA)
            newCourseAssignment.set_ta(TA)
            self._classNumb += 1
            # Setting the lab, meeting time, and semester year and append it to assignment list.
            newCourseAssignment.set_course(cur_lab)
            newCourseAssignment.set_meetingTime(cur_lab.get_meetTimes())
            newCourseAssignment.set_semYr(cur_lab.get_semYr())
            # Setting Hours Used for each GA and TA assigned to this course.
            newCourseAssignment.set_hoursUsedTA(cur_lab.get_activityTimes())
            newCourseAssignment.set_hoursUsedGA(cur_lab.get_activityTimes())
            TAHours = TA.get_hoursAvailable() - int(newCourseAssignment.get_hoursUsedTA())
            GAHours = GA.get_hoursAvailable() - int(newCourseAssignment.get_hoursUsedGA())
            GA.set_hoursAvailable(GAHours)
            TA.set_hoursAvailable(TAHours)
            newCourseAssignment.set_hoursAvailGA(GA.get_hoursAvailable())
            newCourseAssignment.set_hoursAvailTA(TA.get_hoursAvailable())

            self._assignments.append(newCourseAssignment)
        # Assigning Labs that don't have a TA preference to TAs and are not faculty taught.
        for cur_lab in LabFacultyTaughtTA:
            # Assign TA to observe lab and grade lab.
            TA = self.compare_GAPref(cur_lab, TAList)

            newCourseAssignment = CourseAssignment(self._classNumb, TA)
            self._classNumb += 1
            # Setting the lab, meeting time, and semester year and append it to assignment list.
            newCourseAssignment.set_course(cur_lab)
            newCourseAssignment.set_meetingTime(cur_lab.get_meetTimes())
            newCourseAssignment.set_semYr(cur_lab.get_semYr())
            # Setting Hours Used for the TA assigned to this course.
            newCourseAssignment.set_hoursUsedTA(cur_lab.get_activityTimes())
            TAHours = TA.get_hoursAvailable() - int(newCourseAssignment.get_hoursUsedTA())
            TA.set_hoursAvailable(TAHours)
            newCourseAssignment.set_hoursAvailTA(TA.get_hoursAvailable())
            cur_lab.set_GAPref(None)

            self._assignments.append(newCourseAssignment)
        # Assigning Labs that don't have a TA preference to when no TA is needed and are faculty taught.
        for cur_lab in LabFacultyTaughtNoTA:
            # Assign TA to observe lab and grade lab.
            if randomGAStart > len(GAList)-1:
                randomGAStart = 0
            GA = GAList[randomGAStart]
            randomGAStart += 1

            newCourseAssignment = CourseAssignment(self._classNumb, GA)
            self._classNumb += 1
            # Setting the lab, meeting time, and semester year and append it to assignment list.
            newCourseAssignment.set_course(cur_lab)
            newCourseAssignment.set_meetingTime(cur_lab.get_meetTimes())
            newCourseAssignment.set_semYr(cur_lab.get_semYr())
            # Setting Hours Used for the TA assigned to this course.
            newCourseAssignment.set_hoursUsedGA(cur_lab.get_activityTimes())
            GAHours = GA.get_hoursAvailable() - int(newCourseAssignment.get_hoursUsedGA())
            GA.set_hoursAvailable(GAHours)
            newCourseAssignment.set_hoursAvailGA(GA.get_hoursAvailable())

            self._assignments.append(newCourseAssignment)
        # Assigning courses that have GA preferences to preferred GAs
        for cur_course in CourseGAPref:
            # Check if the course preference is the same as the GAs student name.
            GA = self.compare_GAPref(cur_course, GAList)
            
            newCourseAssignment = CourseAssignment(self._classNumb, GA)
            self._classNumb += 1
            # Setting the course, meeting time, and semester year and append it to newClass.
            newCourseAssignment.set_course(cur_course)
            newCourseAssignment.set_meetingTime(cur_course.get_meetTimes())
            # Setting Hours Used for the GA assigned to this course.
            newCourseAssignment.set_hoursUsedGA(cur_course.get_activityTimes())
            GAHours = GA.get_hoursAvailable() - int(newCourseAssignment.get_hoursUsedGA())
            GA.set_hoursAvailable(GAHours)
            newCourseAssignment.set_hoursAvailGA(GA.get_hoursAvailable())
            newCourseAssignment.set_semYr(cur_course.get_semYr())
            self._assignments.append(newCourseAssignment)
        # Assigning courses that have no GA preferences.
        for cur_course in CourseNonGAPref:
            if randomGAStart > len(GAList)-1:
                randomGAStart = 0
            GA = GAList[randomGAStart]
            randomGAStart += 1
            newCourseAssignment = CourseAssignment(self._classNumb, GA)
            self._classNumb += 1
            # Setting the course, meeting time, and semester year and append it to newClass.
            newCourseAssignment.set_course(cur_course)
            newCourseAssignment.set_meetingTime(cur_course.get_meetTimes())
            newCourseAssignment.set_semYr(cur_course.get_semYr())
            # Setting Hours Used for the GA assigned to this course.
            newCourseAssignment.set_hoursUsedGA(cur_course.get_activityTimes())
            GAHours = GA.get_hoursAvailable() - int(newCourseAssignment.get_hoursUsedGA())
            GA.set_hoursAvailable(GAHours)
            newCourseAssignment.set_hoursAvailGA(GA.get_hoursAvailable())

            self._assignments.append(newCourseAssignment)
        # Set remaining hours back to original values.
        for i in range(0, len(gatas)-1):
            gatas[i].set_hoursAvailable(OriginalHours[i][0])
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
            # maybe could be 1 line.
            cur_ga_hours = cur_course_assignment.get_hoursAvailGA()
            cur_ta_hours = cur_course_assignment.get_hoursAvailTA()
            cur_assigned_ga = cur_course_assignment.get_ga()
            cur_assigned_ga_name = cur_assigned_ga.get_studentName()

            cur_assigned_ta = cur_course_assignment.get_ta()
            cur_assigned_ta_name = "None"
            if cur_assigned_ta != "None":
                cur_assigned_ta_name = cur_assigned_ta.get_studentName()
                
            # if current ga is not in the gata_hours_time (which means it is this gata's first assignment)
            if cur_assigned_ga_name not in name_keys:
                # add this gata's original data to the dict
                ga_class_times = self.parse_times(cur_assigned_ga.get_classTimes())
                gata_hours_time.update(
                    {
                        cur_assigned_ga_name: {
                            "unavail_time": ga_class_times,
                        }
                    }
                )
                name_keys.append(cur_assigned_ga_name)
            if cur_assigned_ta_name not in name_keys and cur_assigned_ta != "None":
                # add this gata's original data to the dict
                ta_class_times = self.parse_times(cur_assigned_ta.get_classTimes())
                gata_hours_time.update(
                    {
                        cur_assigned_ta_name: {
                            "unavail_time": ta_class_times,
                        }
                    }
                )
                name_keys.append(cur_assigned_ta_name)
            #  Conflict 1. Compare the gata's unavailable times with class meet time
            #  Parse class time string
            cur_class_time = self.parse_times(cur_course.get_meetTimes())[0]
            # Compare class time and ga's/ta's each unavailable times
            for unavail_time in gata_hours_time[cur_assigned_ga_name]["unavail_time"]:
                if self.find_time_conflicts(cur_class_time, unavail_time):
                    self._numbOfConflicts += 1
            if cur_assigned_ta != "None":
                for unavail_time in gata_hours_time[cur_assigned_ta_name]["unavail_time"]:
                    if self.find_time_conflicts(cur_class_time, unavail_time):
                        self._numbOfConflicts += 1

            if cur_ga_hours < 0:
                self._numbOfConflicts += 1
            gata_hours_time[cur_assigned_ga_name]["unavail_time"].append(cur_class_time)

            if cur_assigned_ta != "None":
                if cur_ta_hours < 0:
                    self._numbOfConflicts += 1
                gata_hours_time[cur_assigned_ta_name]["unavail_time"].append(cur_class_time)
        return 1 / ((1.0 * self._numbOfConflicts + 1))

    def __str__(self):
        returnValue = ""
        for i in range(0, len(self._assignments)-1):
            returnValue += str(self._assignments[i]) + ", "
        returnValue += str(self._assignments[len(self._assignments)-1])
        return returnValue

"""
Methods:
    Getter:
        get_schedules
    Setter:
"""

class Population:
    # Defining variables for Population of schedules.
    def __init__(self, size, semYear):
        data = Data(semYear)
        self._size = size
        self._data = data
        self._schedules = []
        for i in range(0, size):
            self._schedules.append(Schedule(data).initialize())

    # Getting the schedules.
    def get_schedules(self):
        return self._schedules

"""
Meeting time class
Data: 
- Meeting time ID # (Int)
- time intervals (string)
Methods:
    Getter:
        get_id
        get_time
    Setter:
"""

class MeetingTime:
    def __init__(self, id, time):
        self._id = id
        self._time = time

    def get_id(self):
        return self._id

    def get_time(self):
        return self._time

class DisplayMgr:
    def print_generation(self, population):
        table1 = prettytable.PrettyTable(
            [
                "schedule #",
                "fitness",
                "# of conflicts",
                "classes [GA,TA,ClassCode.ClassSection,Meeting Time,Hours Available,Hours Used]",
            ]
        )
        schedules = population.get_schedules()
        for i in range(0, len(schedules)):
            table1.add_row(
                [
                    str(i),
                    round(schedules[i].get_fitness(), 3),
                    schedules[i].get_numbOfConflicts(),
                    schedules[i].__str__(),
                ]
            )

    def print_schedule_as_table(self, population):
        scheduleData = population.get_assignments()
        fitness = population.get_fitness()
        table = prettytable.PrettyTable(
            [
                "CourseAsn#",
                "Fitness",
                "ID",
                "Course",
                "Section",
                "GA",
                "TA",
                "Meeting Times",
                "Semester Year",
                "GA Hours Remaining",
                "GA Hours Used",
                "TA Hours Remaining",
                "TA Hours Used",
            ]
        )
        for i in range(0, len(scheduleData)):
            # print(scheduleData[i].get_hoursAvail())
            table.add_row([str(i),
                            fitness,
                            scheduleData[i].get_id(),
                            scheduleData[i].get_course().get_Name(),
                            scheduleData[i].get_course().get_section(),
                            scheduleData[i].get_ga().get_studentName(),
                            scheduleData[i].get_ta(),
                            scheduleData[i].get_meetingTime(),
                            scheduleData[i].get_semYr(),
                            scheduleData[i].get_hoursAvailGA(),
                            scheduleData[i].get_hoursUsedGA(),
                            scheduleData[i].get_hoursAvailTA(),
                            scheduleData[i].get_hoursUsedTA(),])
        return table

class GeneticAlgorithm:
    def _Fix_Scheduling_Hours(self, Schedule):
        # Investigate this function to ensure it is doing the correct work TODO:
        Assignments = Schedule.get_assignments()
        GAsTAsAssigned = []
        for i in range(0, len(Assignments)):
            # GAsTAsHoursUsed = (Assignments[k].get_hoursUsedGA(), Assignments[k].get_hoursUsedTA())
            if Assignments[i].get_ta() == "None":
                GAsTAsAssigned = (Assignments[i].get_ga().get_id(), "None")
            elif Assignments[i].get_ga() == "None":
                GAsTAsAssigned = ("None", Assignments[i].get_ta().get_id())
            else:
                GAsTAsAssigned = (Assignments[i].get_ga().get_id(), Assignments[i].get_ta().get_id())
            for j in range(0, len(OriginalHours)):
                # Check GA [0] and Check TA [1]
                # We only set the GA or TA object for hours available back to the original but we do not do the same for assignments.
                if GAsTAsAssigned[0] == OriginalHours[j][1]:
                    Assignments[i].get_ga().set_hoursAvailable(OriginalHours[j][0])       
                if GAsTAsAssigned[1] == OriginalHours[j][1]:
                    Assignments[i].get_ta().set_hoursAvailable(OriginalHours[j][0])
        for k in range(0, len(Assignments)):  
            if Assignments[k].get_hoursUsedGA() is None:
                # TA is assigned as GA because it's a faculty taught lab where the TA is teaching another section of the same lab.
                Assignments[k].set_hoursAvailTA(Assignments[k].get_ga().get_hoursAvailable() - Assignments[k].get_hoursUsedTA())
                # poc
                Assignments[k].get_ga().set_hoursAvailable(Assignments[k].get_hoursAvailTA())
            else:
                Assignments[k].set_hoursAvailGA(Assignments[k].get_ga().get_hoursAvailable() - int(Assignments[k].get_hoursUsedGA()))
                Assignments[k].get_ga().set_hoursAvailable(Assignments[k].get_hoursAvailGA())
            if Assignments[k].get_ta() == "None":
                pass
            else:
                Assignments[k].set_hoursAvailTA(Assignments[k].get_ta().get_hoursAvailable() - int(Assignments[k].get_hoursUsedTA()))
                Assignments[k].get_ta().set_hoursAvailable(Assignments[k].get_hoursAvailTA())
        # print(Schedule)
        return Schedule

    # Evolve function calls mutate population which calls crossover population.
    def evolve(self, population, semYr):
        return self._mutate_population(self._crossover_population(population, semYr), semYr)

    # Crossover population
    def _crossover_population(self, pop, semYr):
        # Initialize population
        crossover_pop = Population(0, semYr)
        # Iterate through number of elite schedules we allow, currently 1.
        for i in range(NUMB_OF_ELITE_SCHEDULES):
            # Get schedules of population and append
            crossover_pop.get_schedules().append(pop.get_schedules()[i])
        i = NUMB_OF_ELITE_SCHEDULES
        # While i or number of elite schedules, is less than the population size, 9
        while i < POPULATION_SIZE:
            # Choose 2 populations utilizing tournament selection and get the schedule at index 0 for both.
            schedule1 = self._select_tournament_population(pop, semYr).get_schedules()[0]
            schedule2 = self._select_tournament_population(pop, semYr).get_schedules()[0]
            # Append schedule 1 and 2 to crossover_pop
            crossover_pop.get_schedules().append(
                self._crossover_schedule(schedule1, schedule2, semYr)
            )
            # Continue iterating until i is no longer less than population size.
            i += 1
        # Return the crossover population.
        return crossover_pop

    # Mutate the population.
    def _mutate_population(self, population, semYr):
        # Iterate from number of elite schedules, 1, and population size, 9.
        for i in range(NUMB_OF_ELITE_SCHEDULES, POPULATION_SIZE):
            # Mutate each schedule in population.
            self._mutate_schedule(population.get_schedules()[i], semYr)
        # Return the population.
        return population

    # Crossover Schedule where we take 2 parent schedules and generate children schedules.
    def _crossover_schedule(self, schedule1, schedule2, semYr):
        # Initialize crossover schedule
        # test = Data(semYr)
        # print(test.get_courses().get, test.get_gata(), test.get_labs())
        crossoverSchedule = Schedule(Data(semYr)).initialize()
        # Iterate from 0 to length of classes in crossoverSchedule
        for i in range(0, len(crossoverSchedule.get_assignments())):
            cross = crossoverSchedule.get_assignments()
            # print("FIND ME", cross[i].get_course().get_Name())
            first = schedule1.get_assignments()
            second = schedule2.get_assignments()
            # Given a random value check if greater than .5, if so we set classes of schedule 1 to crossover schedule.
            if rnd.random() > 0.5:
                # Getting course assignment of crossoverSchedule and exchanging with course assignment from schedule1
                cross[i].set_ga(first[i].get_ga())
            # If not we set classes of schedule 2 to crossover schedule.
            else:
                # Getting course assignment of crossoverSchedule and exchanging with course assignment from schedule2
                cross[i].set_ga(second[i].get_ga())
        # Return crossoverSchedule.
        crossoverSchedule = self._Fix_Scheduling_Hours(crossoverSchedule)
        return crossoverSchedule

    # Mutate schedule function.
    def _mutate_schedule(self, mutateSchedule, semYr):
        # Initialize a schedule.
        schedule = Schedule(Data(semYr)).initialize()
        ga = schedule.get_assignments()
        # Iterate from 0 to number of classes in mutateSchedule
        for i in range(0, len(mutateSchedule.get_assignments())):
            # If the mutation rate, 0.1, is greater than the random value, we assign GAs from the initialized schedule to mutateSchedule
            # Investigate this section of code here TODO:
            mutate = mutateSchedule.get_assignments()
            if MUTATION_RATE > rnd.random():
                mutate[i].set_ga(ga[i].get_ga())
        mutateSchedule = self._Fix_Scheduling_Hours(mutateSchedule)
        # Return the mutated schedule.
        return mutateSchedule

    # Tournament selection function.
    def _select_tournament_population(self, pop, semYr):
        # Initalize tournament population.
        tournament_pop = Population(0, semYr)
        i = 0
        # While i is less than the tournament selection size, 3.
        while i < TOURNAMENT_SELECTION_SIZE:
            # Get the schedules of the tournament pop, and append schedules in a random range from 0 to population size. (Random Selection.)
            tournament_pop.get_schedules().append(
                pop.get_schedules()[rnd.randrange(0, POPULATION_SIZE)]
            )
            # Iterate until i is no longer less than tournament selection size.
            i += 1
        # reverse sort the schedules in tournament population based on fitness
        tournament_pop.get_schedules().sort(key=lambda x: x.get_fitness(), reverse=True)
        # Return tournament population.
        return tournament_pop

"""
This class defines a courseAssignment
it requires the id or scheduleNumber, the GATA that it references,
the course that is assigned, the meeting time, the semester/year, 
hours available to be scheduled on this specific GA, 
and how many hours this course takes up each week.

Methods:
    Getters:
        get_id
        get_ga
        get_course
        get_meetingTime
        get_semYr
        get_hoursAvail
        get_hoursUsed
    Setters:
        set_hoursUsed
        set_hoursAvail
        set_semYr
        set_course
        set_meetingTime
"""

class CourseAssignment:
    # Defining a CourseAssignment
    def __init__(self, id, ga):
        self._id = id
        self._ga = ga
        self._ta = "None"
        self._course = None
        self._meetingTime = None
        self._semYr = None
        # This is hours available to schedule the GA/TA.
        # Ex: GA has been scheduled for 8 hours and has a total
        # of 20 hours to be scheduled.
        # This value would be 12 hours.
        self._hoursAvailGA = None
        self._hoursAvailTA = None
        # This is how many hours each course takes up.
        # Ex: A course requires 2 hours of work per week of a GA
        # this value would be 2.
        self._hoursUsedGA = None
        self._hoursUsedTA = None

    # Getters
    def get_id(self): return self._id
    def get_ga(self): return self._ga
    def get_course(self): return self._course
    def get_meetingTime(self): return self._meetingTime
    def get_semYr(self): return self._semYr
    def get_hoursAvailGA(self): return self._hoursAvailGA
    def get_hoursAvailTA(self): return self._hoursAvailTA
    def get_hoursUsedGA(self): return self._hoursUsedGA
    def get_hoursUsedTA(self): return self._hoursUsedTA
    def get_ta(self): return self._ta

    # Setters
    def set_hoursUsedGA(self, hoursUsedGA): self._hoursUsedGA = hoursUsedGA
    def set_hoursUsedTA(self, hoursUsedTA): self._hoursUsedTA = hoursUsedTA
    def set_hoursAvailGA(self, hoursAvailGA): self._hoursAvailGA = hoursAvailGA
    def set_hoursAvailTA(self, hoursAvailTA): self._hoursAvailTA = hoursAvailTA
    def set_semYr(self, semYr): self._semYr = semYr
    def set_course(self, course): self._course = course
    def set_meetingTime(self, meetingTime): self._meetingTime = meetingTime
    def set_ga(self, ga): self._ga = ga
    def set_ta(self, ta): self._ta = ta
    def __str__(self):
        return str(self.get_ga()) + "," + str(self.get_ta()) + "," +  str(self.get_course().get_code()) + "." +  str(self.get_course().get_section())  + "," + str(self.get_meetingTime()) + "," + \
            str(self.get_hoursAvailGA()) + "," + str(self.get_hoursUsedGA()) + "," + str(self.get_hoursAvailTA()) + "," + str(self.get_hoursUsedTA())+" // "

"""
Methods:
    Getters:
        get_gata
        get_courses
        get_labs
    Setters:
"""

class Data:

    def __init__(self, semYr):
        self._Courses = []
        self._GATA = []
        self._Lab = []
        self._semYr = semYr
        self.Courses = getCourses(self._semYr)
        self.Lab = getLabs(self._semYr)
        self.GATA = getGATAs(self._semYr)
        # List of original available hours to assign to GAs and TAs
        global OriginalHours
        OriginalHours = []
        for i in range(0, len(self.Courses)):
            new_course = Course(
                self.Courses[i]['semYr_id'],
                self.Courses[i]['courseCode'],
                self.Courses[i]['courseName'],
                self.Courses[i]['courseSection'],
                self.Courses[i]['courseMeetTimes'],
                self.Courses[i]['courseFaculty'],
                self.Courses[i]['activityTimes'],
                self.Courses[i]['GAPref_id'],
            )
            self._Courses.append(new_course)
        for i in range(0, len(self.GATA)):
            self._GATA.append(
                GATA(
                    self.GATA[i]['id'],
                    self.GATA[i]['semYr_id'],
                    self.GATA[i]['studentName'],
                    self.GATA[i]['hoursAvailable']-self.GATA[i]['officeHours'],
                    self.GATA[i]['officeHours'],
                    self.GATA[i]['classTimes'],
                    self.GATA[i]['studentType']
                )
            )
            OriginalHours.append((self.GATA[i]['hoursAvailable']-self.GATA[i]['officeHours'], self.GATA[i]['id']))

        for i in range(0, len(self.Lab)):
            self._Lab.append(
                Lab(
                    self.Lab[i]['semYr_id'],
                    self.Lab[i]['labCode'],
                    self.Lab[i]['labName'],
                    self.Lab[i]['labSection'],
                    self.Lab[i]['labMeetTimes'],
                    self.Lab[i]['labFaculty'],
                    self.Lab[i]['activityTimes'],
                    self.Lab[i]['GAPref_id'],
                    self.Lab[i]['facultyTaught'],
                    self.Lab[i]['labPrepTime']))

    # Getter functions
    def get_gata(self): return self._GATA

    def get_courses(self): return self._Courses

    def get_labs(self): return self._Lab