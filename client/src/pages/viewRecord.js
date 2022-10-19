import React, { Component } from "react";
import { useState } from 'react';
import 'antd/dist/antd.css';

import { Space, Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';

const studentField = {

    Semester: '',
    name: '',
    classTimes: '',
    hoursAvail: '',
    coursePref: '',
    facultyPref: '',
    officeHours: '',
    studentType: '',
}

const courseFields =
{
    Semester: '',
    courseCode: '',
    name: '',
    courseSection: '',
    courseMeetTimes: '',
    courseFaculty: '',
    courseActivities: '',
    activityTimes: '',
    gaPreference: '',
    classType: '',

}

const studentItems = [
    {
        id: 1,
        semester: 'Fall 2022',
        name: 'John Doe',
        classTimes: 'MW 3:45pm - 5:00 pm',
        hoursAvail: 10,
        coursePref: 'CSC 630',
        facultyPref: 'Dr.Wang',
        officeHours: 1,
        studentType: 'GA'
    },
    {
        id: 2,
        semester: 'Fall 2022',
        name: 'Jane Smith',
        classTimes: 'MW 3:45pm - 5:00 pm',
        hoursAvail: 10,
        coursePref: 'CSC 630',
        facultyPref: 'Dr.Wang',
        officeHours: 1,
        studentType: 'GA'
    },
]
const courseItems = [
    {
        id: 1,
        semester: 'Fall 2022',
        courseCode: 'CSC750',
        name: 'Adv. Software Engineering',
        courseSection: '001',
        courseMeetTimes: 'M 5:00pm-7:30pm',
        courseFaculty: 'Dr.Iqbal',
        courseActivities: 'Grading, preparation',
        activityTimes: '60',
        gaPreference: 'John',
        classType: 'course',

    },
    {
        id: 2,
        semester: 'Fall 2022',
        courseCode: 'CSC450',
        name: 'Software Development',
        courseSection: '001',
        courseMeetTimes: 'W 5:00pm-7:30pm',
        courseFaculty: 'Dr.Iqbal',
        courseActivities: 'Grading, preparation',
        activityTimes: '60',
        gaPreference: 'John',
        classType: 'course',

    },
]

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    /*Input Validation*/
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const App = () => {
    const [viewStudent, setViewStudent] = useState(true);



    const [form] = Form.useForm();
    const [data, setData] = useState(studentItems);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;

    const displayStudents = () => {
        setViewStudent(true)
        setData(studentItems)
    }
    const displayCourses = () => {
        setViewStudent(false)
        setData(courseItems)
    }


    var fields = viewStudent ? studentField : courseFields
    const edit = (record) => {
        form.setFieldsValue({
            fields,
            ...record,
        });
        setEditingKey(record.id);
        /*TODO: Need to be connect to the API*/
    };
    const cancel = () => {
        setEditingKey('');
    };
    const deleteRecord = () => {
        /*TODO: Need to be connect to the API*/
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.id);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };


    const studentColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            editable: true
        },
        {
            title: 'Class Time',
            dataIndex: 'classTimes',
            key: 'classTimes', editable: true
        },
        {
            title: 'Hours Available',
            dataIndex: 'hoursAvail',
            key: 'hoursAvail', editable: true
        },
        {
            title: 'Course Preference',
            dataIndex: 'coursePref',
            key: 'coursePref', editable: true
        },
        {
            title: 'Faculty Preference',
            dataIndex: 'facultyPref',
            key: 'facultyPref', editable: true
        },
        {
            title: 'Office Hours',
            dataIndex: 'officeHours',
            key: 'officeHours', editable: true
        },
        {
            title: 'Student Type',
            dataIndex: 'studentType',
            key: 'studentType', editable: true
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size="middle">
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Space size="middle">
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={deleteRecord}>
                            <a>Delete</a>
                        </Popconfirm></Space>
                )
            },
        },
    ];
    const courseColumns = [
        {
            title: 'Course Code',
            dataIndex: 'courseCode',
            key: 'courseCode',
            render: (text) => <a>{text}</a>,
            editable: true
        },
        {
            title: 'Section',
            dataIndex: 'courseSection',
            key: 'courseSection',
            editable: true
        },
        {
            title: 'Course Name',
            dataIndex: 'name',
            key: 'name', editable: true
        },
        {
            title: 'Meet Times',
            dataIndex: 'courseMeetTimes',
            key: 'courseMeetTimes', editable: true
        },
        {
            title: 'Faculty',
            dataIndex: 'courseFaculty',
            key: 'courseFaculty', editable: true
        },
        {
            title: 'Activity Times',
            dataIndex: 'activityTimes',
            key: 'activityTimes', editable: true
        },
        {
            title: 'GA Preference',
            dataIndex: 'gaPreference',
            key: 'gaPreference', editable: true
        },
        {
            title: 'class Type',
            dataIndex: 'classType',
            key: 'classType', editable: true
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size="middle">
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </Space>
                ) : (
                    <Space size="middle"><Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={deleteRecord}>
                            <a>Delete</a>
                        </Popconfirm></Space>
                )
            },
        },
    ];
    var columns = viewStudent ? studentColumns : courseColumns

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                /*Input type validation*/
                inputType: col.dataIndex === 'courseSection'|| col.dataIndex ==="hoursAvail"||col.dataIndex === 'activityTimes'||col.dataIndex ==='officeHours'? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });



    return (
        <>
            <Space style={{ marginBottom: 16, }}>
                <Button onClick={displayStudents}>Students</Button>
                <Button onClick={displayCourses}>Courses</Button>
            </Space>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form> ;
        </>)
}
export default App;