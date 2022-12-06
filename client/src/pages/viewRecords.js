import React, {Component, useEffect} from "react";
import { useState } from 'react';
import 'antd/dist/antd.css';

import { Select, Space, Button, Form, Input, InputNumber, Popconfirm, Table, Typography, Dropdown } from 'antd';
import {getAllStudent,deleteStudent} from "../services/studentService";
import {getAllCourse} from "../services/courseService";
import { getAllLab } from "../services/labService";
import { getAllSemester } from "../services/semesterService";
import {generateSchedules} from "../services/scheduleService";


const studentField = {
        semYr: '',
        studentName: '',
        classTimes: '',
        hoursAvail: '',
        officeHours: '',
        studentType: ''
}

const courseFields =
{
        semYr: "",
        courseCode: '',
        courseName: '',
        courseSection: '',
        courseMeetTimes: '',
        courseFaculty: '',
        courseActivities: '',
        activityTimes: '',
        GAPref: '',

}

const labFields =
{
        semYr: "",
        labCode: '',
        labName: '',
        labSection: '',
        labMeetTimes: '',
        labFaculty: '',
        activityTimes: '',
        labprepTimes: '',
        GAPref: '',
        facultyTaught:''

}




const findValidateRule=(dataIndex,title)=>{
    var validateRule;
    
    switch(dataIndex){
        case "studentName":
        case "courseName":
        case "labName":
        case "courseFaculty": 
        case "labFaculty":
            validateRule = [
                {
                    required: true,
                    message: `Please Input ${title}!`,
                },
            ]
            break
        case "classTimes":
            validateRule = [
                {
                    required: true,
                    pattern: new RegExp(/^((M|T|W|R|F){1,5}\s([1]?(\d{1})|([1-2][1-4])):(([0-5](\d{1}))|(\d{1}))\s-\s([1]?(\d{1})|[1-2][1-4]):(([0-5](\d{1}))|(\d{1}));?)*(?<!;)$/),
                    message: `Please Input Valid ${title}!`,
                },
            ]    
            break
        case "courseMeetTimes":
        case "labMeetTimes":
            validateRule = [
                {
                    required: true,
                    pattern: new RegExp(/^(M|T|W|R|F){1,5}\s([1]?(\d{1})|([1-2][1-4])):(([0-5](\d{1}))|(\d{1}))\s-\s([1]?(\d{1})|[1-2][1-4]):(([0-5](\d{1}))|(\d{1}))$/),
                    message: `Please Input Valid ${title}!`,
                },
            ]    
            break
        case "hoursAvailable":
            validateRule = [
                {
                    required: true,
                    pattern: new RegExp(/^([1][0-9])|[2][0]$/),
                    message: `Please Input (10-20) Available Hours}!`,
                },
            ]    
                break
        case "studentType":
            validateRule = [
                {
                    required: true,
                    pattern: new RegExp(/^(GA|TA)$/),
                    message: `Please Input Valid Student Type!`,
                },
            ]    
                break
        case "officeHours":
            validateRule = [
                {
                    required: true,
                    pattern: new RegExp(/^[0-5]$/),
                    message: `Please Input Valid Office Hours(0-5)!`,
                },
            ]    
                break

        case "activityTimes":
        case "labPrepTime":
                validateRule = [
                    {
                        required: true,
                        pattern: new RegExp(/^[0-10]$/),
                        message: `Please Input Valid ${title}(0-10)!`,
                    },
                ]    
                    break
        case "facultyTaught":
                validateRule = [
                    {
                        required: true,
                        pattern: new RegExp(/^(true|false)$/),
                        message: `Please Input Valid ${title}(true or false)!`,
                    },
                ]    
                    break
        } 
    /*console.log(dataIndex,validateRule)*/

     
     return validateRule
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
                     rules={findValidateRule(dataIndex,title)}
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
    const [fields, setfields] = useState(studentField);
    

    const [students, setStudents] = useState([])
    const [courses, setCourses] = useState([])
    const [labs, setlabs] = useState([])
    const [data, setData] = useState(students);
    const [semYr, setSemYr] = useState([]);
    const [semYrData, setsemYrData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const studentsData = await getAllStudent()
            setStudents(studentsData)
            setData(studentsData)
            const coursesData = await getAllCourse()
            setCourses(coursesData)
            const labsData = await getAllLab()
            setlabs(labsData)
            const semData = await getAllSemester()

            setsemYrData(semData)
        }
        getData()
    },[])


    const [form] = Form.useForm();
    const options = semYrData.map((item, index) => (
        {value:item.id,
        key:{index},
        label:item.Semester+' '+item.Year,}))
    /*console.log(data)*/

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;

    const displayStudents = () => {
        setfields(studentField)
        setData(students)
        setColumns(studentColumns)
    }
    const displayCourses = () => {
        setfields(courseFields)
        setData(courses)
        setColumns(courseColumns)
    }
    const displayLabs = () => {
        console.log(labs)
        setfields(labFields)
        setData(labs)
        setColumns(labColumns)
    }
    const handleChange = (value)=>{
        setSemYr(value)
    }



    const edit = (record) => {
        form.setFieldsValue({
            fields,
            ...record,
        });
        console.log("clicked edit",record.id,isEditing)
        setEditingKey(record.id);
        /*TODO: Need to be connect to the API*/
    };
    const cancel = () => {
        setEditingKey('');
    };
    const deleteRecord = async (record) => {
        /*TODO: Need to be connect to the API*/
        setEditingKey('record.id');
        console.log("This is record: ", record)
        // try{
        //     const response = await deleteStudent(record.id,record)
        // } catch(errInfo){
        //     console.log("Could not delete the record.", errInfo)
        // }

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


    /*switch(fields){
        case "course":
            columns = courseColumns;
        case "lab":
            columns = labColumns;
        case "student":
            columns = studentColumns;
        default:
            columns = studentColumns;
    }*/

    const studentColumns = [
        {
            title: 'Semester Year',
            dataIndex: 'semYr',
            key: 'semYr',
            render: (text) => <a>{text}</a>,
            editable: true
        },
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
            title: 'Semester Year',
            dataIndex: 'semYr',
            key: 'semYr',
            render: (text) => <a>{text}</a>,
            editable: false
        },
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
    const labColumns = [
        {
            title: 'Lab Code',
            dataIndex: 'labCode',
            key: 'labCode',
            render: (text) => <a>{text}</a>,
            editable: false
        },
        {
            title: 'Section',
            dataIndex: 'labSection',
            key: 'labSection',
            editable: true
        },
        {
            title: 'lab Name',
            dataIndex: 'labName',
            key: 'labName', editable: true
        },
        {
            title: 'Meet Times',
            dataIndex: 'labMeetTimes',
            key: 'labMeetTimes', editable: true
        },
        {
            title: 'Faculty',
            dataIndex: 'labFaculty',
            key: 'labFaculty', editable: true
        },
        {
            title: 'Activity Times',
            dataIndex: 'activityTimes',
            key: 'activityTimes', editable: true
        },
        {
            title: 'Preparation Times',
            dataIndex: 'labPrepTime',
            key: 'labPrepTime', editable: true
        },
        {
            title: 'GA Preference',
            dataIndex: 'GAPref',
            key: 'GAPref', editable: true
        },
        
        {
            title: 'Faculty Taught',
            dataIndex: 'facultyTaught',
            key: 'facultyTaught', editable: true,
            render : (text) => String(text),
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

    const [columns,setColumns] = useState(studentColumns)
    /*console.log(columns)*/

    

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                /*Input type validation*/
                inputType: col.dataIndex === 'courseCode'||col.dataIndex === 'courseSection'|| col.dataIndex === 'labCode'||col.dataIndex === 'labSection'||
                col.dataIndex ==="hoursAvailable"||col.dataIndex ==="officeHours"||col.dataIndex === 'labPrepTime'||
                col.dataIndex ==='semYr'||col.dataIndex === 'activityTimes'? 'number' : 'text',
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
                <Button onClick={displayLabs}>Labs</Button>
                <Select defaultValue={options[0]} style={{width: 120,}} onChange={handleChange} options={options}>
                  </Select>
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
               <Button  type="primary" onClick={() => generateSchedules(semYr)}>Generate Schedule</Button>
            </Form>
        </>)
}
export default ViewRecords;