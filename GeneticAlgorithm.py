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
class MeetingTime:
    def __init__(self, id, time):
        self._id = id
        self._time = time
    def get_id(self): return self._id
    def get_time(self): return self._time
class DisplayMgr:
    def print_available_data(self):
        print("> All Available Data")
        self.print_course()
        self.print_student()
        self.print_meeting_times()
    def print_course(self):
        availableCoursesTable = prettytable.PrettyTable(['id', 'course #', 'Activity Hours', 'students'])
        courses = data.get_courses()
        for i in range(0, len(courses)):
            students = courses[i].get_students()
            tempStr = ""
            for j in range(0, len(students) - 1):
                tempStr += students[j].__str__() + ", "
            tempStr += students[len(students) - 1].__str__()
            availableCoursesTable.add_row(
                [courses[i].get_number(), courses[i].get_name(), str(courses[i].get_activityHours()), tempStr])
        print(availableCoursesTable)
    def print_student(self):
        availableStudentsTable = prettytable.PrettyTable(['id', 'student'])
        students = data.get_students()
        for i in range(0, len(students)):
            availableStudentsTable.add_row([students[i].get_id(), students[i].get_name()])
        print(availableStudentsTable)
    def print_meeting_times(self):
        availableMeetingTimeTable = prettytable.PrettyTable(['id', 'Meeting Time'])
        meetingTimes = data.get_meetingTimes()
        for i in range(0, len(meetingTimes)):
            availableMeetingTimeTable.add_row([meetingTimes[i].get_id(), meetingTimes[i].get_time()])
        print(availableMeetingTimeTable)
    def print_generation(self, population):
        table1 = prettytable.PrettyTable(['schedule #', 'fitness', '# of conflicts', 'classes [dept,class,room,student,meeting-time]'])
        schedules = population.get_schedules()
        for i in range(0, len(schedules)):
            table1.add_row([str(i), round(schedules[i].get_fitness(),3), schedules[i].get_numbOfConflicts(), schedules[i].__str__()])
        print(table1)
    def print_schedule_as_table(self, schedule):
        classes = schedule.get_classes()
        table = prettytable.PrettyTable(['Class #', 'Course (number, Activity Hours)','Student (Id)',  'Meeting Time (Id)'])
        for i in range(0, len(classes)):
            table.add_row([str(i), classes[i].get_course().get_name() + " (" +
                           classes[i].get_course().get_number() + ", " +
                           str(classes[i].get_course().get_activityHours()) +")",
                           classes[i].get_student().get_name() +" (" + str(classes[i].get_student().get_id()) +")",
                           classes[i].get_meetingTime().get_time() +" (" + str(classes[i].get_meetingTime().get_id()) +")"])
        print(table)

# Leave for Last, this class defines our genetic algorithm.
# TODO: Caleb but also all of us.
class GeneticAlgorithm: pass
class Class: pass

# TODO: Tobi
class Data: pass