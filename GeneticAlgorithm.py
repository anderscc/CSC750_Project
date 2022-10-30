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
    def __init__(self, semYr, courseCode, courseName, courseSection, courseMeetTimes, courseFaculty, activityTimes,
                 GAPref):
        self._semYr = semYr
        self._courseCode = courseCode
        self._courseName = courseName
        self._courseSection = courseSection
        self._courseMeetTimes = courseMeetTimes
        self._courseFaculty = courseFaculty
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

    def get_activityTimes(self): return self._activityTimes

    def get_GAPref(self): return self._GAPref

    def __str__(self): return self._name


class Lab:
    def __init__(self, semYr, labCode, labName, labSection, labMeetTimes, labFaculty, activityTimes,
                 GAPref, facultyTaught):
        self._semYr = semYr
        self._labCode = labCode
        self._labName = labName
        self._labSection = labSection
        self._labMeetTimes = labMeetTimes
        self._labFaculty = labFaculty
        self._activityTimes = activityTimes
        self._GAPref = GAPref
        self._facultyTaught = facultyTaught

    # Getters.
    def get_semYr(self): return self._semYr

    def get_labCode(self): return self._labCode

    def get_labName(self): return self._labName

    def get_labSection(self): return self._labSection

    # make the function more general applicable
    # def get_labMeetTimes(self): return self._labMeetTimes
    def get_meetTimes(self): return self._labMeetTimes

    def get_labFaculty(self): return self._labFaculty

    def get_activityTimes(self): return self._activityTimes

    def get_GAPref(self): return self._GAPref

    def get_facultyTaught(self): return self._facultyTaught


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
        if self._isFitnessChanged == True:
            # Recalculate fitness for each schedule
            self._fitness = self.calculate_fitness()
            print("Number of conflicts for current schedule:",self._fitness)
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
            newCourseAssignment.set_meetingTime(cur_course.get_meetTimes())
            newCourseAssignment.set_hoursUsed(cur_course.get_activityTimes())
            newCourseAssignment.set_semYr(cur_course.get_semYr())

            self._assignments.append(newCourseAssignment)

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
            gata_hours_time[cur_assigned_gata_name]["unavail_time"].append(cur_class_time)

            # TODO: Calculate the rewards score for each assignments for rank of final results.

        return self._numbOfConflicts


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
            crossover_pop.get_schedules().append(self._crossover_schedule(schedule1, schedule2))
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
            if (rnd.random() > 0.5):
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
            if (MUTATION_RATE > rnd.random()): mutateSchedule.get_assignments()[i] = schedule.get_assignments()[i]
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
            tournament_pop.get_schedules().append(pop.get_schedules()[rnd.randrange(0, POPULATION_SIZE)])
            # Iterate until i is no longer less than tournament selection size.
            i += 1
        # reverse sort the schedules in tournament population based on fitness
        tournament_pop.get_schedules().sort(key=lambda x: x.get_fitness(), reverse=True)
        # Return tournament population.
        return tournament_pop


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
class Data:
    Courses = [["Fall 2022", "CSC 799", "Thesis", "001", "M 11:00 - 12:00", "DR RAZIB IQBAL", 4, "Caleb B.", ],
               ["Fall 2022", "CSC 790", "Graduate Topics in Computer Science", "001", "TW 11:00 - 12:00",
                "DR AJAY KATANGUR", 2, ''],
               ["Fall 2022", "CSC 765", "Ubiquitous Computing and Internet of Things", "001", "F 1:00 - 2:30",
                "DR MUKULIKA GHOSH", 3, ''],
               ["Fall 2022", "CSC 755", "Software Testing and Quality Assurance", "001", "M 1:00 - 3:00",
                "DR LLOYD SMITH", 4,
                "Calvin A"],
               ["Fall 2022", "CSC 750", "Advanced Topics in Software Engineering", "001", "M 5:00 - 7:30",
                "DR RAZIB IQBAL", 1,
                "Caleb B."],
               ["Fall 2022", "CSC 747", "Multimedia Communications", "001", "R 10:00 - 12:00", "DR AJAY KATANGUR", 4,
                "Godwin E."],
               ["Fall 2022", "CSC 746", "Human Computer Interaction", "001", "T 4:00 - 5:15", "DR ALAA SHETA", 3, ''],
               ["Fall 2022", "CSC 745", "Advanced Multimedia Programming", "001", "W 9:00 - 10:15", "DR LLOYD SMITH", 2,
                ''],
               ["Fall 2022", "CSC 742", "Evolutionary Computing", "001", "TR 3:30 - 4:45", "DR ALAA SHETA", 1, ''],
               ["Fall 2022", "CSC 737", "Deep Learning", "001", "T 9:00 - 10:00", "DR MUKULIKA GHOSH", 2, ''],
               ["Fall 2022", "CSC 736", "Machine Learning", "001", "F 09:00 - 11:00", "DR AJAY KATANGUR", 4, '']]

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
        ["Fall 2022", "CALVIN A.", 20, "DR RAZIB IQBAL", "CSC 750", "WR 9:00 - 10:00",
         "MT 15:30 - 17:30;M 11:00 - 12:00", 'GA'],
        ["Fall 2022", "CALEB B.", 20, "DR ALAA SHETA", "CSC 742", "MF 9:00 - 10:00", "TR 13:30 - 14:45;M 11:00 - 12:00",
         'TA'],
        ["Fall 2022", "WENYU Z.", 10, "DR MUKULIKA GHOSH", "CSC 737", "R 9:00 - 10:00", "T 8:00 - 10:00", 'GA'],
        ["Fall 2022", "GODWIN E.", 10, "DR AJAY KATANGUR", "CSC 736", "T 9:00 - 10:00", "F 9:00 - 11:00", 'GA'],
        ["Fall 2022", "OLUWATOBI A.", 20, "DR LLOYD SMITH", "CSC 745", "M 9:00 - 10:00", "W 9:00 - 10:15", 'GA'],

    ]

    Lab = [["Fall 2022", "CSC 125", "Introduction to C++ Programming", "001", "M 1:00 - 2:30", "DR RAZIB IQBAL", 2, ""],
           ["Fall 2022", "CSC 197", "Introductory Topics in Computer Science", "001", "T 1:00 - 2:30",
            "DR AJAY KATANGUR", 3, ""],
           ["Fall 2022", "CSC 226", "Special Languages", "001", "W 4:00 - 500", "DR LLOYD SMITH", 2.5, ""],
           ["Fall 2022", "CSC 121", "Introduction to BASIC Programming", "001", "R 2:00 - 4:00", "DR MUKULIKA GHOSH",
            1.5, ""],
           ]

    def __init__(self):
        self._Courses = [];
        self._GATA = [];
        self._Lab = []
        for i in range(0, len(self.Courses)):
            new_course = Course(self.Courses[i][0], self.Courses[i][1], self.Courses[i][2], self.Courses[i][3],
                                self.Courses[i][4], self.Courses[i][5], self.Courses[i][6], self.Courses[i][7])
            self._Courses.append(new_course)
        for i in range(0, len(self.GATA)):
            self._GATA.append(GATA(self.GATA[i][0], self.GATA[i][1], self.GATA[i][2], self.GATA[i][3], self.GATA[i][4],
                                   self.GATA[i][5], self.GATA[i][6], self.GATA[i][7]))
        for i in range(0, len(self._Lab)):
            self._Lab.append(
                Lab(self.Lab[i][0], self.Lab[i][1], self.Lab[i][2], self.Lab[i][3], self.Lab[i][4], self.Lab[i][5],
                    self.Lab[i][6], ))

    # Getter functions
    def get_gata(self):
        return self._GATA

    def get_courses(self):
        return self._Courses

    def get_labs(self):
        return self._Lab


# Creating object for hard coded data.
data = Data()
# Creating object for output
# displayMgr = DisplayMgr()
# Printing all available data.
# displayMgr.print_available_data()
generationNumber = 0
print("\n> Generation # " + str(generationNumber))
population = Population(POPULATION_SIZE)
cur_schedules = population.get_schedules()
cur_schedules.sort(key=lambda x: x.get_fitness(), reverse=True)
displayMgr.print_generation(population)
displayMgr.print_schedule_as_table(population.get_schedules()[0])
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
print("\n\n")
