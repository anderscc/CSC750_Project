# Pretty table helps with printing.
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
class Data:
    # Rooms Data, probably won't use.
    ROOMS = [["R1",25], ["R2",45], ["R3",35]]
    # GATA class times possibly?
    MEETING_TIMES = [["MT1", "MWF 09:00 - 10:00"],
                     ["MT2", "MWF 10:00 - 11:00"],
                     ["MT3", "TTH 09:00 - 10:30"],
                     ["MT4", "TTH 10:30 - 12:00"]]
    # GATA information.
    INSTRUCTORS = [["I1", "Dr James Web"],
                   ["I2", "Mr. Mike Brown"],
                   ["I3", "Dr Steve Day"],
                   ["I4", "Mrs Jane Doe"]]
    # Initialize the data.
    def __init__(self):
        # Room data (Probably won't use), meeting times, instructors being initiallized.
        self._rooms = []; self._meetingTimes = []; self._instructors = []
        for i in range(0, len(self.ROOMS)):
            self._rooms.append(Room(self.ROOMS[i][0], self.ROOMS[i][1]))
        for i in range(0, len(self.MEETING_TIMES)):
            self._meetingTimes.append(MeetingTime(self.MEETING_TIMES[i][0], self.MEETING_TIMES[i][1]))
        for i in range(0, len(self.INSTRUCTORS)):
            self._instructors.append(Instructor(self.INSTRUCTORS[i][0], self.INSTRUCTORS[i][1]))
        # Course Data.
        course1 = Course("C1", "325K", [self._instructors[0], self._instructors[1]], 25)
        course2 = Course("C2", "319K", [self._instructors[0], self._instructors[1], self._instructors[2]], 35)
        course3 = Course("C3", "462k", [self._instructors[0], self._instructors[1]], 25)
        course4 = Course("C4", "464K", [self._instructors[2], self._instructors[3]], 30)
        course5 = Course("C5", "360C", [self._instructors[3]], 35)
        course6 = Course("C6", "303K", [self._instructors[0], self._instructors[2]], 45)
        course7 = Course("C7", "303L", [self._instructors[1], self._instructors[3]], 45)
        self._courses = [course1, course2, course3, course4, course5, course6, course7]
        # This could be important if this program gets taken to the rest of the College, NOT IMPORTANT RIGHT NOW.
        dept1 = Department("MATH", [course1, course3])
        dept2 = Department("EE", [course2, course4, course5])
        dept3 = Department("PHY", [course6, course7])
        self._depts = [dept1, dept2, dept3]
        self._numberOfClasses = 0
        # Number of classes per department.
        for i in range(0, len(self._depts)):
            self._numberOfClasses += len(self._depts[i].get_courses())
    # Getter functions.
    def get_rooms(self): return self._rooms
    def get_instructors(self): return self._instructors
    def get_courses(self): return self._courses
    def get_depts(self): return self._depts
    def get_meetingTimes(self): return self._meetingTimes
    def get_numberOfClasses(self): return self._numberOfClasses
# Schedule function.
class Schedule:
    # Define a Schedule
    def __init__(self):
        self._data = data
        self._classes = []
        self._numbOfConflicts = 0
        self._fitness = -1
        self._classNumb = 0
        self._isFitnessChanged = True
    # Getting classes, re-setting fitness changed to True.
    def get_classes(self):
        self._isFitnessChanged = True
        return self._classes
    # Getting fitness and number of conflicts.
    def get_numbOfConflicts(self): return self._numbOfConflicts
    def get_fitness(self):
        if (self._isFitnessChanged == True):
            # Recalculate fitness for each schedule
            self._fitness = self.calculate_fitness()
            self._isFitnessChanged = False
        return self._fitness
    # Initializing schedule.
    def initialize(self):
        # Iterate through departments to get courses.
        depts = self._data.get_depts()
        for i in range(0, len(depts)):
            # Iterate through courses to create new classes.
            courses = depts[i].get_courses()
            for j in range(0, len(courses)):
                newClass = Class(self._classNumb, depts[i], courses[j])
                self._classNumb += 1
                # Setting the meeting time, room, and instructor of course and append it to newClass.
                newClass.set_meetingTime(data.get_meetingTimes()[rnd.randrange(0, len(data.get_meetingTimes()))])
                newClass.set_room(data.get_rooms()[rnd.randrange(0, len(data.get_rooms()))])
                newClass.set_instructor(courses[j].get_instructors()[rnd.randrange(0, len(courses[j].get_instructors()))])
                self._classes.append(newClass)
        return self
    # Calculate fitness function
    def calculate_fitness(self):
        # Initialize conflicts to 0
        self._numbOfConflicts = 0
        # Get classes from self
        classes = self.get_classes()
        # Iterate through length of classes
        for i in range(0, len(classes)):
            # If seating capacity of classes is less than max number of students allowed in course increase number of conflicts.
            if (classes[i].get_room().get_seatingCapacity() < classes[i].get_course().get_maxNumbOfStudents()):
                self._numbOfConflicts += 1
            # Iterate through classes
            for j in range(0, len(classes)):
                # If there is a class
                if (j >= i):
                    # if meeting times from i loop and j for loop match, and they are not the same class
                    if (classes[i].get_meetingTime() == classes[j].get_meetingTime() and
                    classes[i].get_id() != classes[j].get_id()):
                        # If the classes from i loop and j loop have the same room booked, increase conflicts.
                        if (classes[i].get_room() == classes[j].get_room()): self._numbOfConflicts += 1
                        # If instructor from i loop and j loop match, increase conflicts
                        if (classes[i].get_instructor() == classes[j].get_instructor()): self._numbOfConflicts += 1
        # Return number of conflicts
        return 1 / ((1.0*self._numbOfConflicts + 1))
    # Used to display class name in output.
    def __str__(self):
        returnValue = ""
        for i in range(0, len(self._classes)-1):
            returnValue += str(self._classes[i]) + ", "
        returnValue += str(self._classes[len(self._classes)-1])
        return returnValue
# Population function.
class Population:
    # Defining variables for Population of schedules.
    def __init__(self, size):
        self._size = size
        self._data = data
        self._schedules = []
        for i in range(0, size): self._schedules.append(Schedule().initialize())
    # Getting the schedules.
    def get_schedules(self): return self._schedules
# Genetic Algorithm Function (The hard part to figure out)
class GeneticAlgorithm:
    # Evolve function calls mutate population which calls crossover population.
    def evolve(self, population): return self._mutate_population(self._crossover_population(population))
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
        for i in range(0, len(crossoverSchedule.get_classes())):
            # Given a random value check if greater than .5, if so we set classes of schedule 1 to crossover schedule.
            if (rnd.random() > 0.5): crossoverSchedule.get_classes()[i] = schedule1.get_classes()[i]
            # If not we set classes of schedule 2 to crossover schedule.
            else: crossoverSchedule.get_classes()[i] = schedule2.get_classes()[i]
        # Return crossoverSchedule.
        return crossoverSchedule
    # Mutate schedule function.
    def _mutate_schedule(self, mutateSchedule):
        # Initialize a schedule.
        schedule = Schedule().initialize()
        # Iterate from 0 to number of classes in mutateSchedule
        for i in range(0, len(mutateSchedule.get_classes())):
            # If the mutation rate, 0.1, is greater than the random value, we assign classes from the initialized schedule to mutateSchedule
            if(MUTATION_RATE > rnd.random()): mutateSchedule.get_classes()[i] = schedule.get_classes()[i]
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
# Class for courses.
class Course:
    # define variables for a course.
    def __init__(self, number, name, instructors, maxNumbOfStudents):
        self._number = number
        self._name = name
        self._maxNumbOfStudents = maxNumbOfStudents
        self._instructors = instructors
    # Getters.
    def get_number(self): return self._number
    def get_name(self): return self._name
    def get_instructors(self): return self._instructors
    def get_maxNumbOfStudents(self): return self._maxNumbOfStudents
    def __str__(self): return self._name
# Class for Instructors
class Instructor:
    # Define variables for an instructor.
    def __init__(self, id, name):
        self._id = id
        self._name = name
    # Getters.
    def get_id(self): return self._id
    def get_name(self): return self._name
    def __str__(self): return self._name
# Class for Rooms (Probably won't use)
class Room:
    # Define variables for Rooms
    def __init__(self, number, seatingCapacity):
        self._number = number
        self._seatingCapacity = seatingCapacity
    # Getters.
    def get_number(self): return self._number
    def get_seatingCapacity(self): return self._seatingCapacity
# Class for Meeting Times.
class MeetingTime:
    # Define variables for Meeting Times.
    def __init__(self, id, time):
        self._id = id
        self._time = time
    # Getters.
    def get_id(self): return self._id
    def get_time(self): return self._time
# Class for Departments. (Could be a point of scalability)
class Department:
    # Define variables for Departments.
    def __init__(self, name, courses):
        self._name = name
        self._courses = courses
    # Getters.
    def get_name(self): return self._name
    def get_courses(self): return self._courses
# Class for classes.
class Class:
    # Defining variables for a Class.
    def __init__(self, id, dept, course):
        self._id = id
        self._dept = dept
        self._course = course
        self._instructor = None
        self._meetingTime = None
        self._room = None
    # Getters and Setters.
    def get_id(self): return self._id
    def get_dept(self): return self._dept
    def get_course(self): return self._course
    def get_instructor(self): return self._instructor
    def get_meetingTime(self): return self._meetingTime
    def get_room(self): return self._room
    def set_instructor(self, instructor): self._instructor = instructor
    def set_meetingTime(self, meetingTime): self._meetingTime = meetingTime
    def set_room(self, room): self._room = room
    def __str__(self):
        return str(self._dept.get_name()) + "," + str(self._course.get_number()) + "," + \
               str(self._room.get_number()) + "," + str(self._instructor.get_id()) + "," + str(self._meetingTime.get_id())
# This entire class is displaying the output, won't comment the whole thing unless I need to.
class DisplayMgr:
    def print_available_data(self):
        print("> All Available Data")
        self.print_dept()
        self.print_course()
        self.print_room()
        self.print_instructor()
        self.print_meeting_times()
    def print_dept(self):
        depts = data.get_depts()
        availableDeptsTable = prettytable.PrettyTable(['dept', 'courses'])
        for i in range(0, len(depts)):
            courses = depts.__getitem__(i).get_courses()
            tempStr = "["
            for j in range(0, len(courses) - 1):
                tempStr += courses[j].__str__() + ", "
            tempStr += courses[len(courses) - 1].__str__() + "]"
            availableDeptsTable.add_row([depts.__getitem__(i).get_name(), tempStr])
        print(availableDeptsTable)
    def print_course(self):
        availableCoursesTable = prettytable.PrettyTable(['id', 'course #', 'max # of students', 'instructors'])
        courses = data.get_courses()
        for i in range(0, len(courses)):
            instructors = courses[i].get_instructors()
            tempStr = ""
            for j in range(0, len(instructors) - 1):
                tempStr += instructors[j].__str__() + ", "
            tempStr += instructors[len(instructors) - 1].__str__()
            availableCoursesTable.add_row(
                [courses[i].get_number(), courses[i].get_name(), str(courses[i].get_maxNumbOfStudents()), tempStr])
        print(availableCoursesTable)
    def print_instructor(self):
        availableInstructorsTable = prettytable.PrettyTable(['id', 'instructor'])
        instructors = data.get_instructors()
        for i in range(0, len(instructors)):
            availableInstructorsTable.add_row([instructors[i].get_id(), instructors[i].get_name()])
        print(availableInstructorsTable)
    def print_room(self):
        availableRoomsTable = prettytable.PrettyTable(['room #', 'max seating capacity'])
        rooms = data.get_rooms()
        for i in range(0, len(rooms)):
            availableRoomsTable.add_row([str(rooms[i].get_number()), str(rooms[i].get_seatingCapacity())])
        print(availableRoomsTable)
    def print_meeting_times(self):
        availableMeetingTimeTable = prettytable.PrettyTable(['id', 'Meeting Time'])
        meetingTimes = data.get_meetingTimes()
        for i in range(0, len(meetingTimes)):
            availableMeetingTimeTable.add_row([meetingTimes[i].get_id(), meetingTimes[i].get_time()])
        print(availableMeetingTimeTable)
    def print_generation(self, population):
        table1 = prettytable.PrettyTable(['schedule #', 'fitness', '# of conflicts', 'classes [dept,class,room,instructor,meeting-time]'])
        schedules = population.get_schedules()
        for i in range(0, len(schedules)):
            table1.add_row([str(i), round(schedules[i].get_fitness(),3), schedules[i].get_numbOfConflicts(), schedules[i].__str__()])
        print(table1)
    def print_schedule_as_table(self, schedule):
        classes = schedule.get_classes()
        table = prettytable.PrettyTable(['Class #', 'Dept', 'Course (number, max # of students)', 'Room (Capacity)', 'Instructor (Id)',  'Meeting Time (Id)'])
        for i in range(0, len(classes)):
            table.add_row([str(i), classes[i].get_dept().get_name(), classes[i].get_course().get_name() + " (" +
                           classes[i].get_course().get_number() + ", " +
                           str(classes[i].get_course().get_maxNumbOfStudents()) +")",
                           classes[i].get_room().get_number() + " (" + str(classes[i].get_room().get_seatingCapacity()) + ")",
                           classes[i].get_instructor().get_name() +" (" + str(classes[i].get_instructor().get_id()) +")",
                           classes[i].get_meetingTime().get_time() +" (" + str(classes[i].get_meetingTime().get_id()) +")"])
        print(table)


# Creating object for hard coded data.
data = Data()
# Creating object for output
displayMgr = DisplayMgr()
# Printing all available data.
displayMgr.print_available_data()
generationNumber = 0
print("\n> Generation # "+str(generationNumber))
population = Population(POPULATION_SIZE)
population.get_schedules().sort(key=lambda x: x.get_fitness(), reverse=True)
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