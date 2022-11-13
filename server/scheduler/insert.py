from .models import Assignment, Schedules


def createAssignment(scheduleNum, semYr, id, coursesAsn, hoursAsn):
    try:
        assign = Assignment(scheduleNum, semYr, id, coursesAsn, hoursAsn)
        assign.save()
    except Exception as e:
        print("Could not insert due to error: " + e)
        return False
    return True


def createSchedule(id, semYr, scheduleNum, conflicts):
    try:
        sched = Schedules(id, semYr, scheduleNum, conflicts)
        sched.save()
    except Exception as e:
        print("Could not insert due to error: " + e)
        return False
    return True
