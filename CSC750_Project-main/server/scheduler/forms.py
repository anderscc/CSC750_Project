from django import forms
from .models import *

class AddGA_TA(forms.ModelForm):
    class Meta:
        model = GATA
        fields = '__all__'

class AddCourses(forms.ModelForm):
    class Meta:
        model = Courses
        fields = '__all__'

class AddLabs(forms.ModelForm):
    class Meta:
        model = Labs
        fields = '__all__'

class AddAssignment(forms.ModelForm):
    class Meta:
        model = Assignment
        fields = '__all__'

class AddSchedules(forms.ModelForm):
    class Meta:
        model = Schedules
        fields = '__all__'


