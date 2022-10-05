from django.contrib import admin
from .models import GATA, Courses, Labs, Assignment, Schedules

class GATAAdmin(admin.ModelAdmin):
    list_display = ( 'studentName', 'hoursAvailable', 'coursePref','facultyPref', 'officeHours', 'classTimes' )

class CoursesAdmin(admin.ModelAdmin):
    list_display = ('courseCode', 'courseName', 'courseSection', 'courseMeetTimes','courseFaculty', 'courseActivities', 'activityTimes', 'GAPref' )

class LabsAdmin(admin.ModelAdmin):
    list_display = ('labCode', 'labName', 'labFaculty', 'labSection','labMeetTimes', 'activityTimes', 'GAPref' )

class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('scheduleNum', 'uidAsn', 'coursesAsn', 'hoursAsn')

class SchedulesAdmin(admin.ModelAdmin):
    list_display = ('scheduleNum', 'conflicts')


# Register your models here.
admin.site.register(GATA, GATAAdmin)
admin.site.register(Courses, CoursesAdmin)
admin.site.register(Labs, LabsAdmin)
admin.site.register(Assignment, AssignmentAdmin)
admin.site.register(Schedules, SchedulesAdmin)

