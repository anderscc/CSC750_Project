# Pretty table helps with displaying output, we can use something else if it works better.
import prettytable as prettytable

# Random class.
import random as rnd
import datetime  # for time comparison

# Defined population size.
# Adjusted to 1 for testing, change back to 9 when finished. TODO
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
    def __init__(self, id, semYr, studentName, hoursAvailable, officeHours, classTimes,
                 studentType):
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
    def __init__(self, semYr, labCode, labName, labSection, labMeetTimes, labFaculty, activityTimes,
                 GAPref, facultyTaught, prepTime):
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

    def get_facultyTaught(self):
        return self._facultyTaught

    def get_prepTime(self): return self._prepTime

    def __str__(self): return self._labName

# TODO: Wenyu
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
            # print(CourseLab.get_GAPref(), GA.get_id())
            if (CourseLab.get_GAPref() == GA.get_id()):
                return GA

    # Initializing schedule.
    def initialize(self):
        # TODO: Create 
        # Get lists of courses and labs
        courses = self._data.get_courses()
        labs = self._data.get_labs()
        gatas = self._data.get_gata()
        # Used for storing GAs Separate from TAs
        GAList = []
        TAList = []
        CourseGAPref = []
        CourseNonGAPref = []
        LabTAPref = []
        LabNonTAPref = []

        # print("\n")
        for i in gatas:
            # print(gatas[i].get_studentType())
            # Differentiate between GA and TA and append to appropriate list.
            if(i.get_studentType() == 'GA'):
                GAList.append(i)
                # print(i)
            elif(i.get_studentType() == 'TA'):
                TAList.append(i)
            # Input validation.
            elif(i.get_studentType() == ''):
                print("This student does not have a student Type.")
            else:
                print("This students type is not valid.")
        # print(len(GAList), len(TAList))
        for course in courses:
            # Testing
            # print(course.get_GAPref())
            if(course.get_GAPref() is None):
                # print("This course does not have a GA Preference.")
                CourseNonGAPref.append(course)
            elif(course.get_GAPref() != None):
                # print("This course has a GA preference.")
                CourseGAPref.append(course)
        # print("\n")
        unique_labs = {}
        for lab in labs:
            # Testing
            # print(lab.get_GAPref())
            if(lab.get_GAPref() is None):
                # print("This course does not have a GA/TA Preference.")
                LabNonTAPref.append(lab)
            elif(lab.get_GAPref() != None):
                # print("This lab has a GA Preference.")
                LabTAPref.append(lab)

            if lab.get_code() in unique_labs:
                if lab.get_section() !=  unique_labs[lab.get_code()][0].get_section():
                    unique_labs[lab.get_code()].append(lab)
            else:
                unique_labs[lab.get_code()] = [lab]


        len_ga = len(GAList)
        len_ta = len(TAList)

        # Iterate through all courses
        for cur_lab in LabTAPref:
            TA = self.compare_GAPref(cur_lab, gatas)
            # print(TA)
            newCourseAssignment = CourseAssignment(self._classNumb, TA)
            self._classNumb += 1
            # Setting the lab, meeting time, and semester year and append it to assignment list.
            newCourseAssignment.set_course(cur_lab)
            newCourseAssignment.set_meetingTime(cur_lab.get_meetTimes())
            newCourseAssignment.set_hoursUsed(cur_lab.get_activityTimes() + cur_lab.get_prepTime())
            newCourseAssignment.set_semYr(cur_lab.get_semYr())

            self._assignments.append(newCourseAssignment)

        # Iterate through all courses
        gata_counter = 0
        for cur_lab in LabNonTAPref:
            # TODO: If applicable, assign TA to Faculty taught lab and TA taught lab so TA knows how to teach the lab.
            # TODO: Always assign GA to Lab to assist TA.
            # TODO: Make sure GA is not being assigned to 2 labs simultaneously. We need to take into account Meeting Times when making assignments.
            # TODO: Think about case where Faculty wants GA present for the course meeting time. Professor will make a lab for this class and GA assigned to that class will need to be assigned to that specific lab.
            # TODO: For TA assignment, assign additional hours for Preparation.
            # TODO: Think about scenario where we have multiple classes to assign but not enough hours on a single GA/TA. Possibly split up activities into 2 parts to assign 2 GAs. This will help the Professor greatly.
            # TODO: If assigning GA to more than 3 courses, should penalize.
            # TODO: If course or lab has 8 hours, we prefer to have a single GA for course or GA and TA for lab, if not enough hours remaining Can split between 2 GAs but assignment should be penalized, 3 way split should be heavily penalized.
            # TODO: [Not Necessary, Would be nice] Possibly think about an hour break for lunch in middle of day.
            # If (!facultyTaught):
            #   Assign a TA.
            #

            # Assign a random gata
            gata = gatas[gata_counter]
            newCourseAssignment = CourseAssignment(self._classNumb, gata)
            self._classNumb += 1
            # Setting the lab, meeting time, and semester year and append it to assignment list.
            newCourseAssignment.set_course(cur_lab)
            newCourseAssignment.set_meetingTime(cur_lab.get_meetTimes())
            newCourseAssignment.set_hoursUsed(cur_lab.get_activityTimes() + cur_lab.get_prepTime())
            newCourseAssignment.set_semYr(cur_lab.get_semYr())

            self._assignments.append(newCourseAssignment)

            if (len(gatas) - 1) == gata_counter:
                gata_counter = 0
            else:
                gata_counter += 1


        # Iterate through all courses and labs
        # Iterate through all courses to assign a random TAGA
        for cur_course in CourseGAPref:
            # Check if the course preference is the same as the GAs student name.
            GA = self.compare_GAPref(cur_course, GAList)
            # print(GA)
            
            newCourseAssignment = CourseAssignment(self._classNumb, GA)
            self._classNumb += 1
            # Setting the course, meeting time, and semester year and append it to newClass.
            newCourseAssignment.set_course(cur_course)
            newCourseAssignment.set_meetingTime(cur_course.get_meetTimes())
            newCourseAssignment.set_hoursUsed(cur_course.get_activityTimes())
            newCourseAssignment.set_semYr(cur_course.get_semYr())

            self._assignments.append(newCourseAssignment)

        # Iterate through all courses and labs
        # Iterate through all courses to assign a random TAGA
        for cur_course in CourseNonGAPref:

            gata = gatas[gata_counter]
            newCourseAssignment = CourseAssignment(self._classNumb, gata)
            self._classNumb += 1
            # Setting the course, meeting time, and semester year and append it to newClass.
            newCourseAssignment.set_course(cur_course)
            newCourseAssignment.set_meetingTime(cur_course.get_meetTimes())
            newCourseAssignment.set_hoursUsed(cur_course.get_activityTimes())
            newCourseAssignment.set_semYr(cur_course.get_semYr())

            self._assignments.append(newCourseAssignment)

            if (len(gatas) - 1) == gata_counter:
                gata_counter = 0
            else:
                gata_counter += 1



        for lab in unique_labs:

            for cur_lab in unique_labs[lab]:

                gata = gatas[gata_counter]
                newCourseAssignment = CourseAssignment(self._classNumb, gata)
                self._classNumb += 1
                # Setting the course, meeting time, and semester year and append it to newClass.
                newCourseAssignment.set_course(cur_lab)
                newCourseAssignment.set_meetingTime(cur_lab.get_meetTimes())
                newCourseAssignment.set_hoursUsed(cur_lab.get_activityTimes())
                newCourseAssignment.set_semYr(cur_lab.get_semYr())

                self._assignments.append(newCourseAssignment)

            if (len(gatas) - 1) == gata_counter:
                gata_counter = 0
            else:
                gata_counter += 1

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
                    {
                        cur_assigned_gata_name: {
                            "remaining_hours": cur_assigned_gata.get_hoursAvailable(),
                            "unavail_time": gata_class_times,
                        }
                    }
                )
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
            # print(gata_hours_time[cur_assigned_gata_name])
            gata_hours_time[cur_assigned_gata_name]["unavail_time"].append(cur_class_time)

            # TODO: Calculate the rewards score for each assignments for rank of final results.

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
    def __init__(self, size):
        self._size = size
        self._data = data
        self._schedules = []
        for i in range(0, size):
            self._schedules.append(Schedule().initialize())

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
                "classes [Student,Class section.ClassCode,Meeting Time,Hours Available,Hours Used]",
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
        print(table1)

    def print_schedule_as_table(self, population):
        scheduleData = population.get_assignments()
        fitness = population.get_fitness()
        table = prettytable.PrettyTable(
            [
                "Schedule #",
                "Fitness",
                "ID",
                "Course",
                "GA",
                "Meeting Times",
                "Semester Year",
                "GA Hours Remaining",
                "GA Hours Used",
            ]
        )
        for i in range(0, len(scheduleData)):
            # print(scheduleData[i].get_hoursAvail())
            table.add_row([str(i), 
                            fitness,
                            scheduleData[i].get_id(),
                            scheduleData[i].get_course().get_Name(),
                            scheduleData[i].get_gata().get_studentName(),
                            scheduleData[i].get_meetingTime(),
                            scheduleData[i].get_semYr(),
                            scheduleData[i].get_hoursAvail(),
                            scheduleData[i].get_hoursUsed()])
        print(table)


# Leave for Last, this class defines our genetic algorithm.
# TODO: Caleb but also all of us.
class GeneticAlgorithm:
    # Evolve function calls mutate population which calls crossover population.
    def evolve(self, population):
        return self._mutate_population(self._crossover_population(population))

    # Crossover population
    def _crossover_population(self, pop):
        # Initialize population
        crossover_pop = Population(0)
        # Iterate through number of elite schedules we allow, currently 1.
        for i in range(NUMB_OF_ELITE_SCHEDULES):
            # Get schedules of population and append
            crossover_pop.get_schedules().append(pop.get_schedules()[i])
        i = NUMB_OF_ELITE_SCHEDULES
        # While i or number of elite schedules, is less than the population size, 9
        while i < POPULATION_SIZE:
            # Choose 2 populations utilizing tournament selection and get the schedule at index 0 for both.
            schedule1 = self._select_tournament_population(pop).get_schedules()[0]
            schedule2 = self._select_tournament_population(pop).get_schedules()[0]
            # Append schedule 1 and 2 to crossover_pop
            crossover_pop.get_schedules().append(
                self._crossover_schedule(schedule1, schedule2)
            )
            # Continue iterating until i is no longer less than population size.
            i += 1
        # Return the crossover population.
        return crossover_pop

    # Mutate the population.
    def _mutate_population(self, population):
        # Iterate from number of elite schedules, 1, and population size, 9.
        for i in range(NUMB_OF_ELITE_SCHEDULES, POPULATION_SIZE):
            # Mutate each schedule in population.
            self._mutate_schedule(population.get_schedules()[i])
        # Return the population.
        return population

    # Crossover Schedule where we take 2 parent schedules and generate children schedules.
    def _crossover_schedule(self, schedule1, schedule2):
        # Initialize crossover schedule
        crossoverSchedule = Schedule().initialize()
        # Iterate from 0 to length of classes in crossoverSchedule
        for i in range(0, len(crossoverSchedule.get_assignments())):
            # Given a random value check if greater than .5, if so we set classes of schedule 1 to crossover schedule.
            if rnd.random() > 0.5:
                crossoverSchedule.get_assignments()[i] = schedule1.get_assignments()[i]
            # If not we set classes of schedule 2 to crossover schedule.
            else:
                crossoverSchedule.get_assignments()[i] = schedule2.get_assignments()[i]
        # Return crossoverSchedule.
        return crossoverSchedule

    # Mutate schedule function.
    def _mutate_schedule(self, mutateSchedule):
        # Initialize a schedule.
        schedule = Schedule().initialize()
        # Iterate from 0 to number of classes in mutateSchedule
        for i in range(0, len(mutateSchedule.get_assignments())):
            # If the mutation rate, 0.1, is greater than the random value, we assign classes from the initialized schedule to mutateSchedule
            if MUTATION_RATE > rnd.random():
                mutateSchedule.get_assignments()[i] = schedule.get_assignments()[i]
        # Return the mutated schedule.
        return mutateSchedule

    # Tournament selection function.
    def _select_tournament_population(self, pop):
        # Initalize tournament population.
        tournament_pop = Population(0)
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
        get_gata
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
    def get_id(self):
        return self._id

    def get_gata(self):
        return self._gata

    def get_course(self):
        return self._course

    def get_meetingTime(self):
        return self._meetingTime

    def get_semYr(self):
        return self._semYr

    def get_hoursAvail(self):
        return self._hoursAvail

    def get_hoursUsed(self): return self._hoursUsed

    # Setters
    def set_hoursUsed(self, hoursUsed):
        self._hoursUsed = hoursUsed

    def set_hoursAvail(self, hoursAvail):
        self._hoursAvail = hoursAvail

    def set_semYr(self, semYr):
        self._semYr = semYr

    def set_course(self, course):
        self._course = course

    def set_meetingTime(self, meetingTime):
        self._meetingTime = meetingTime

    def __str__(self):
        return str(self.get_gata()) + "," +  str(self.get_course().get_code()) + "." +  str(self.get_course().get_section())  + "," + str(self.get_meetingTime()) + "," + \
            str(self.get_hoursAvail()) + "," + str(self.get_hoursUsed()) + " // "


# TODO: Tobi
"""
Methods:
    Getters:
        get_gata
        get_courses
        get_labs
    Setters:
"""


class Data:
    # semYr,    courseCode, courseName,                     courseSection, courseMeetTimes, courseFaculty, activityTimes, GAPref
    Courses = [["Fall 2022", "CSC 799", "Thesis",                                      "001", "M 11:00 - 12:00", "DR RAZIB IQBAL",    4, 1],
               ["Fall 2022", "CSC 790", "Graduate Topics in Computer Science",         "001", "TW 11:00 - 12:00","DR AJAY KATANGUR",  2, None],
               ["Fall 2022", "CSC 765", "Ubiquitous Computing and Internet of Things", "001", "F 1:00 - 2:30",   "DR MUKULIKA GHOSH", 3, None],
               ["Fall 2022", "CSC 755", "Software Testing and Quality Assurance",      "001", "M 1:00 - 3:00",   "DR LLOYD SMITH",    4, 5],
               ["Fall 2022", "CSC 750", "Advanced Topics in Software Engineering",     "001", "M 5:00 - 7:30",   "DR RAZIB IQBAL",    1, 4],
               ["Fall 2022", "CSC 747", "Multimedia Communications",                   "001", "R 10:00 - 12:00", "DR AJAY KATANGUR",  4, 3],
               ["Fall 2022", "CSC 746", "Human Computer Interaction",                  "001", "T 4:00 - 5:15",   "DR ALAA SHETA",     3, None],
               ["Fall 2022", "CSC 745", "Advanced Multimedia Programming",             "001", "W 9:00 - 10:15",  "DR LLOYD SMITH",    2, None],
               ["Fall 2022", "CSC 742", "Evolutionary Computing",                      "001", "TR 3:30 - 4:45",  "DR ALAA SHETA",     1, None],
               ["Fall 2022", "CSC 737", "Deep Learning",                               "001", "T 9:00 - 10:00",  "DR MUKULIKA GHOSH", 2, None],
               ["Fall 2022", "CSC 736", "Machine Learning",                            "001", "F 09:00 - 11:00", "DR AJAY KATANGUR",  4, None]
               ]

    # testing conficts
    # Courses = [["Fall 2022", "CSC 799", "Thesis", "001", "M 11:00 - 12:00", "DR RAZIB IQBAL", 4, "Caleb B.", ],
    #            ["Fall 2022", "CSC 790", "Graduate Topics in Computer Science", "001", "M 11:00 - 12:00",
    #             "DR AJAY KATANGUR", 2, ''],
    #            ["Fall 2022", "CSC 765", "Ubiquitous Computing and Internet of Things", "001", "M 11:00 - 12:00",
    #             "DR MUKULIKA GHOSH", 3, ''],
    #            ["Fall 2022", "CSC 755", "Software Testing and Quality Assurance", "001", "M 11:00 - 12:00",
    #             "DR LLOYD SMITH", 4,
    #             "Calvin A"],
    #            ["Fall 2022", "CSC 750", "Advanced Topics in Software Engineering", "001", "M 11:00 - 12:00",
    #             "DR RAZIB IQBAL", 1,
    #             "Caleb B."],
    #            ["Fall 2022", "CSC 747", "Multimedia Communications", "001", "M 11:00 - 12:00", "DR AJAY KATANGUR", 4,
    #             "Godwin E."],
    #            ["Fall 2022", "CSC 746", "Human Computer Interaction", "001", "M 11:00 - 12:00", "DR ALAA SHETA", 3, ''],
    #            ["Fall 2022", "CSC 745", "Advanced Multimedia Programming", "001", "M 11:00 - 12:00", "DR LLOYD SMITH", 2,
    #             ''],
    #            ["Fall 2022", "CSC 742", "Evolutionary Computing", "001", "M 11:00 - 12:00", "DR ALAA SHETA", 1, ''],
    #            ["Fall 2022", "CSC 737", "Deep Learning", "001", "M 11:00 - 12:00", "DR MUKULIKA GHOSH", 2, ''],
    #            ["Fall 2022", "CSC 736", "Machine Learning", "001", "M 11:00 - 12:00", "DR AJAY KATANGUR", 4, '']]

    GATA = [
        # Office hours needs to be taken into consideration. If a GA has 2 office hours, that means 18 hours are available for courses.
        # id, semYr,      studentName,  hoursAvailable, officeHours, classTimes,                   studentType
        [1, "Fall 2022", "CALVIN A.",      20, 2,"MT 15:30 - 17:30;W 11:00 - 12:00", 'GA'],
        [2, "Fall 2022", "CALEB B.",       20, 2, "TR 13:30 - 14:45;M 11:00 - 12:00",'GA'],
        [3, "Fall 2022", "WENYU Z.",       10, 1, "T 8:00 - 10:00",                   'GA'],
        [4, "Fall 2022", "GODWIN E.",      10, 1, "F 9:00 - 11:00",                   'GA'],
        [5, "Fall 2022", "OLUWATOBI A.",   20, 2, "W 9:00 - 10:15",                   'GA'],
        [6, "Fall 2022", "Jack Jack",      20, 2,"MT 15:30 - 17:30;M 11:00 - 12:00", 'TA'],
        [7, "Fall 2022", "Mr. Incredible", 20, 2, "TR 13:30 - 14:45;M 11:00 - 12:00",'TA'],
        [8, "Fall 2022", "Ms. Incredible", 10, 1, "T 8:00 - 10:00",                   'TA'],
        [9, "Fall 2022", "Violet",         10, 1, "F 9:00 - 11:00",                   'TA'],
        [10, "Fall 2022", "Dash",          20, 2, "W 9:00 - 10:15",                   'TA'],
        [1, "Fall 2022", "CALVIN A.",      20, 2,"MT 15:30 - 17:30;W 11:00 - 12:00", 'GA'],
        [2, "Fall 2022", "CALEB B.",       20, 2, "TR 13:30 - 14:45;M 11:00 - 12:00",'GA'],
        [3, "Fall 2022", "WENYU Z.",       10, 1, "T 8:00 - 10:00",                   'GA'],
        [4, "Fall 2022", "GODWIN E.",      10, 1, "F 9:00 - 11:00",                   'GA'],
        [5, "Fall 2022", "OLUWATOBI A.",   20, 2, "W 9:00 - 10:15",                   'GA'],
        [6, "Fall 2022", "Jack Jack",      20, 2,"MT 15:30 - 17:30;M 11:00 - 12:00", 'TA'],
        [7, "Fall 2022", "Mr. Incredible", 20, 2, "TR 13:30 - 14:45;M 11:00 - 12:00",'TA'],
        [8, "Fall 2022", "Ms. Incredible", 10, 1, "T 8:00 - 10:00",                   'TA'],
        [9, "Fall 2022", "Violet",         10, 1, "F 9:00 - 11:00",                   'TA'],
        [10, "Fall 2022", "Dash",          20, 2, "W 9:00 - 10:15",                   'TA']
    ]
           # semYr,        labCode, labName,                               labSection, labMeetTimes, labFaculty, activityTimes, GAPref, facultyTaught, prepTime
    Lab = [["Fall 2022", "CSC 125", "Introduction to C++ Programming",         "001", "M 1:00 - 2:30", "DR RAZIB IQBAL", 2,      None, True, 2],
           ["Fall 2022", "CSC 197", "Introductory Topics in Computer Science", "001", "T 1:00 - 2:30","DR AJAY KATANGUR", 3,     None, True, 2],
           ["Fall 2022", "CSC 226", "Special Languages",                       "001", "W 4:00 - 5:00", "DR LLOYD SMITH", 2.5,     None, True, 2],
           ["Fall 2022", "CSC 121", "Introduction to BASIC Programming",       "001", "R 2:00 - 4:00", "DR MUKULIKA GHOSH", 1.5, None, True, 2],
           ["Fall 2022", "CSC 125", "Introduction to C++ Programming",         "002", "M 1:00 - 2:30", "DR RAZIB IQBAL", 2,      7, False, 2],
           ["Fall 2022", "CSC 197", "Introductory Topics in Computer Science", "002", "T 1:00 - 2:30","DR AJAY KATANGUR", 3,     6, False, 2],
           ["Fall 2022", "CSC 226", "Special Languages",                       "001", "W 4:00 - 5:01", "DR LLOYD SMITH", 2.5,     8, False, 2],
           ["Fall 2022", "CSC 121", "Introduction to BASIC Programming",       "002", "R 2:00 - 4:00", "DR MUKULIKA GHOSH", 1.5, 10,False, 2]
           ]

    def __init__(self):
        self._Courses = []
        self._GATA = []
        self._Lab = []
        for i in range(0, len(self.Courses)):
            new_course = Course(
                self.Courses[i][0],
                self.Courses[i][1],
                self.Courses[i][2],
                self.Courses[i][3],
                self.Courses[i][4],
                self.Courses[i][5],
                self.Courses[i][6],
                self.Courses[i][7],
            )
            self._Courses.append(new_course)
        for i in range(0, len(self.GATA)):
            self._GATA.append(GATA(self.GATA[i][0], self.GATA[i][1], self.GATA[i][2], self.GATA[i][3]-self.GATA[i][4], self.GATA[i][4],self.GATA[i][5],self.GATA[i][6]))

        for i in range(0, len(self.Lab)):
            self._Lab.append(Lab(self.Lab[i][0], self.Lab[i][1], self.Lab[i][2], self.Lab[i][3], self.Lab[i][4], self.Lab[i][5],
                    self.Lab[i][6], self.Lab[i][7], self.Lab[i][8], self.Lab[i][9]))

    # Getter functions
    def get_gata(self): return self._GATA

    def get_courses(self): return self._Courses

    def get_labs(self): return self._Lab


# Creating object for hard coded data.
data = Data()
# Creating object for output
displayMgr = DisplayMgr()
# Printing all available data.
# displayMgr.print_available_data()
generationNumber = 0
print("\n> Generation # " + str(generationNumber))
population = Population(POPULATION_SIZE)
cur_schedules = population.get_schedules()
cur_schedules.sort(key=lambda x: x.get_fitness(), reverse=True)
displayMgr.print_generation(population)
#displayMgr.print_schedule_as_table(population.get_schedules()[0])
geneticAlgorithm = GeneticAlgorithm()
# Here we determine how long we want the algorithm to run.
# Currently set to find a single schedule with 0 conflicts.
# This can be changed by implementing a count variable to get many schedules with 0 conflicts.
while (population.get_schedules()[0].get_fitness() != 1.0):
    generationNumber += 1
    print("\n> Generation # " + str(generationNumber))
    population = geneticAlgorithm.evolve(population)
    population.get_schedules().sort(key=lambda x: x.get_fitness(), reverse=True)
    displayMgr.print_generation(population)
    displayMgr.print_schedule_as_table(population.get_schedules()[0])
    # These lines are strictly for testing purposes.
    # displayMgr.print_schedule_as_table(population.get_schedules()[1])
    # displayMgr.print_schedule_as_table(population.get_schedules()[2])
    # displayMgr.print_schedule_as_table(population.get_schedules()[3])
    # displayMgr.print_schedule_as_table(population.get_schedules()[4])
    # displayMgr.print_schedule_as_table(population.get_schedules()[5])
    # displayMgr.print_schedule_as_table(population.get_schedules()[6])
    # displayMgr.print_schedule_as_table(population.get_schedules()[7])
print("\n\n")
