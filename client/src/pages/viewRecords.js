import React, {Component, useEffect} from "react";
import { useState } from 'react';
import 'antd/dist/antd.css';

import { Space, Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import {getAllStudent} from "../services/studentService";
import {getAllCourse} from "../services/courseService";


const studentField = {
    id: '',
        semYr: '',
        studentName: '',
        classTimes: '',
        hoursAvail: '',
        coursePref: '',
        facultyPref: '',
        officeHours: '',
        studentType: ''
}

const courseFields =
{
        id: '',
        semYr: "",
        courseCode: '',
        courseName: '',
        courseSection: '',
        courseMeetTimes: '',
        courseFaculty: '',
        courseActivities: '',
        activityTimes: '',
        GAPref: '',
        classType: '',

}


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

const ViewRecords = () => {
    const [viewStudent, setViewStudent] = useState(true);

    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])
    const [data, setData] = useState(students);

    useEffect(() => {
        const getData = async () => {
            const studentsData = await getAllStudent()
            setStudents(studentsData)
            setData(studentsData)
            const coursesData = await getAllCourse()
            setCourses(coursesData)
        }
        getData()
    },[])

    const [form] = Form.useForm();

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;

    const displayStudents = () => {
        setViewStudent(true)
        setData(students)
    }
    const displayCourses = () => {
        setViewStudent(false)
        setData(courses)
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
            dataIndex: 'studentName',
            key: 'studentName',
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
            dataIndex: 'hoursAvailable',
            key: 'hoursAvailable', editable: true
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
            dataIndex: 'courseName',
            key: 'courseName', editable: true
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
            dataIndex: 'GAPref',
            key: 'GAPref', editable: true
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
               <Button  type="primary">Generate Schedule</Button>
            </Form>
        </>)
}
export default ViewRecords;