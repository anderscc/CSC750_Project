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
# Generated by Django 4.1.3 on 2022-12-02 03:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GATA',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('studentName', models.CharField(max_length=100, unique=True)),
                ('hoursAvailable', models.PositiveSmallIntegerField(default=10)),
                ('officeHours', models.PositiveSmallIntegerField(default=1)),
                ('classTimes', models.CharField(max_length=255)),
                ('studentType', models.CharField(default='GA', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='SemesterYear',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('Semester', models.CharField(max_length=30)),
                ('Year', models.CharField(max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name='Schedules',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('conflicts', models.PositiveSmallIntegerField(default=0)),
                ('semYr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduler.semesteryear')),
            ],
        ),
        migrations.CreateModel(
            name='Labs',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('labCode', models.PositiveSmallIntegerField(default=100)),
                ('labName', models.CharField(max_length=255)),
                ('labFaculty', models.CharField(max_length=255)),
                ('labSection', models.PositiveSmallIntegerField(default=1)),
                ('labMeetTimes', models.CharField(max_length=100)),
                ('activityTimes', models.CharField(max_length=255)),
                ('facultyTaught', models.BooleanField(default=True)),
                ('labPrepTime', models.PositiveSmallIntegerField(default=1)),
                ('GAPref', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduler.gata')),
                ('semYr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduler.semesteryear')),
            ],
        ),
        migrations.AddField(
            model_name='gata',
            name='semYr',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduler.semesteryear'),
        ),
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('courseCode', models.PositiveSmallIntegerField(default=100)),
                ('courseName', models.CharField(max_length=255)),
                ('courseSection', models.PositiveSmallIntegerField(default=1)),
                ('courseMeetTimes', models.CharField(max_length=100)),
                ('courseFaculty', models.CharField(max_length=255)),
                ('activityTimes', models.CharField(max_length=255)),
                ('GAPref', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduler.gata')),
                ('semYr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduler.semesteryear')),
            ],
        ),
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('AssignmentID', models.AutoField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('MeetTimes', models.CharField(default=None, max_length=100)),
                ('GATAhrsused', models.PositiveSmallIntegerField(default=0)),
                ('GATAHrsRem', models.PositiveSmallIntegerField(default=0)),
                ('coursesAsn', models.CharField(max_length=255)),
                ('scheduleNum', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduler.schedules')),
                ('semYr', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='scheduler.semesteryear')),
                ('studentName', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='scheduler.gata', to_field='studentName')),
            ],
        ),
    ]
