from .models import Assignment, Schedules, Courses, Labs, GATA


def createAssignment( semYr, studentName, MeetTimes, GATAhrsused, GATAHrsRem, coursesAsn, scheduleNum):
    try:
        assign = Assignment(semYr=semYr, studentName=studentName, MeetTimes=MeetTimes, GATAhrsused=GATAhrsused, GATAHrsRem=GATAHrsRem, coursesAsn=coursesAsn, scheduleNum=scheduleNum)
        assign.save()
    except Exception as e:
        print(e)
        return False
    return assign


def createSchedule(semYr, conflicts):
    try:
        sched = Schedules(semYr=semYr, conflicts=conflicts)
        sched.save()
    except Exception as e:
        print(e)
        return False
    return sched

def getSchedules(semYr):
    schedules = Schedules.objects.filter(semYr=semYr)
    return schedules

def getCourses(semYr):
    return Courses.objects.filter(semYr=semYr)

def getLabs(semYr):
    return Labs.objects.filter(semYr=semYr)

def getGATAs(semYr):
    return GATA.objects.filter(semYr=semYr)


