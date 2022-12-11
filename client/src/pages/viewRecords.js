// Copyright (c) 2022 Caleb Bryant, Wenyu Zhao, Calvin Anderson, Godwin Ekuma, Oluwatobi Atolagbe
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE


import React, {Component, useEffect} from "react";
import { useState } from 'react';
import 'antd/dist/antd.css';
import { ToastContainer, toast } from 'react-toastify';

import { Select, Space, Button, Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import {getAllStudent,deleteStudent,updateStudent} from "../services/studentService";
import {getAllCourse, deleteCourse,updateCourse} from "../services/courseService";
import { getAllLab, deleteLab,updateLab } from "../services/labService";
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
        totalGATAHours: '',
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
        totalGATAHours: '',
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

        case "totalGATAHours":
        case "labPrepTime":
                validateRule = [
                    {
                        required: true,
                        pattern: new RegExp(/^[0-9]$|^1[0-9]$|^20$/),
                        message: `Please Input Valid ${title}(0-20)!`,
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
    const [tabTracker, setTabTracker] = useState('student');

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

    const message_toast = (result,message)=>{
        if(result == 'success'){
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
      }
      else{
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
      }
    
    }



    const [form] = Form.useForm();
    const options = semYrData.map((item, index) => (
        {value:item.id,
        key:{index},
        label:item.Semester+' '+item.Year,}))
    /*console.log(data)*/

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;
    
    useEffect(()=>{;
        console.log('current editing key:',editingKey,isEditing);},
        [editingKey])
    
    

    const displayStudents = () => {
        setfields(studentField)
        setData(students)
        setColumns(studentColumns)  
        setTabTracker('student')
    }
    const displayCourses = () => {
        setfields(courseFields)
        setData(courses)
        setColumns(courseColumns)  
        setTabTracker('course')  
    }
    const displayLabs = () => {
        setfields(labFields)
        setData(labs)
        setColumns(labColumns)
        setTabTracker('lab')
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
        let new_editing_key = record.id
        setEditingKey(new_editing_key)
        
        
        /*TODO: Need to be connect to the API*/
    };
    const cancel = () => {
        setEditingKey('');
    };
    
    useEffect(()=>{;
        console.log('current Tab:',tabTracker);},
        [tabTracker])

    const deleteRecord = async (id,tab) => {
        /*TODO: Need to be connect to the API*/
        switch(tab){
            default:
                console.log("In the default case.")
                return
            case 'student':
                try{
                    const response = await deleteStudent(id)
                    message_toast('success',"Record deleted successfully, please refresh.")
                }catch(errInfo){
                    console.log("Could not delete the student record.", errInfo)
                    message_toast('failed',"Deletion failed, try reclick on the tab")
                }
                break;
            case 'lab':
                try{
                    const response = await deleteLab(id)
                    message_toast('success',"Record deleted successfully, please refresh.")
                }catch(errInfo){
                    console.log("Could not delete the lab record.", errInfo)
                    message_toast('failed',"Deletion failed, try reclick on the tab")
                }
                break;
                case 'course':
                    const response = await deleteCourse(id)
                    if (response!=404)
                        {message_toast('success',"Record deleted successfully, please refresh.")}
                    else{
                        console.log("Could not delete the course record.")
                        message_toast('failed',"Deletion failed, try reclick on the tab")
                    }
                    break;
        }

    };
    const save = async (key,tab) => {
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
                var response;
                switch(tab){
                    case 'student':
                        response = await updateStudent(key,newData[index])
                        break;
                    case 'lab':
                        response = await updateLab(key,newData[index])
                        break;
                    case 'course':
                        response = await updateCourse(key,newData[index])
                        break;
                    }
                if (response!= "error"){
                    console.log(response)
                    message_toast('success','The record is updated!')
                }
                else{
                    message_toast('','Unable to update, please try again or contact developer.')
                }
                
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log(tab, key, data)
            console.log('Validate Failed:', errInfo);
            message_toast('','Unable to update, please try again or contact developer.')
        }
    };
    const call_generateSchedule = async (semYr)=>{
        console.log("calling..")
        try{
            const response = await generateSchedules(semYr)
            if (response!= "error"){
                console.log(response)
                message_toast('success','The record is generated and dowloading!')
            }
            else{
                console.log(response)
                message_toast('','Unable to generate, please check semester year or contact developer.')
            }
        }
        catch (errInfo) {
            message_toast('','Unable to generate, please check semester year or contact developer.')}

    }


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
            render: (text) =>  <a>{text}</a>,

            editable: false
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
                console.log('rendering...')
                /*console.log("isEditing",record.id,editingKey)*/
                const editable = isEditing(record);
                /*console.log("editable",editable,editingKey)*/
                return editable ? (
                    <Space size="middle">
                        <Typography.Link
                            onClick={() => save(record.id,'student')}
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
                        <Popconfirm title="Sure to delete?" onConfirm={()=>deleteRecord(record.id,'student')}>
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
            title: 'Total GA/TA Hours',
            dataIndex: 'totalGATAHours',
            key: 'totalGATAHours', editable: true
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
                            onClick={() => save(record.id,'course')}
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
                    <Space size="middle"><Typography.Link disabled={editingKey !== ''} onClick={() => {edit(record)}}>
                        Edit
                    </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={()=>deleteRecord(record.id,'course')}>
                            <a>Delete</a>
                        </Popconfirm></Space>
                )
            },
        },
    ];
    const labColumns = [
        {
            title: 'Semester Year',
            dataIndex: 'semYr',
            key: 'semYr',
            render: (text) => <a>{text}</a>,
            editable: false
        },
        {
            title: 'Lab Code',
            dataIndex: 'labCode',
            key: 'labCode',
            render: (text) => <a>{text}</a>,
            editable: true
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
            title: 'Total GA/TA Hours',
            dataIndex: 'totalGATAHours',
            key: 'totalGATAHours', editable: true
        },
        {
            title: 'Preparation Times',
            dataIndex: 'labPrepTime',
            key: 'labPrepTime', editable: true
        },
        {
            title: 'TA Preference',
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
                            onClick={() => save(record.id,'lab')}
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
                        <Popconfirm title="Sure to delete?" onConfirm={()=>deleteRecord(record.id,'lab')}>
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
                col.dataIndex ==='semYr'||col.dataIndex === 'totalGATAHours'? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });



    return (
        <>
            <Space style={{ marginBottom: 8, marginTop: 8,marginLeft:8, color:'red'}}>
                Tabs:
                <Button onClick={displayStudents}>GA/TA</Button>
                <Button onClick={displayCourses}>Courses</Button>
                <Button onClick={displayLabs}>Labs</Button>
                To show 'Save' button on Action Column, please press the Tab after click on "Edit".
                
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
                <Select  placeholder={'Select Semester'} style={{marginLeft:8,width: 150,}} onChange={handleChange} options={options}></Select>
               <Button style={{marginLeft:8}} type="primary" onClick={() => call_generateSchedule(semYr)}>Generate Schedule</Button>
            </Form>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
          />
          {/* Same as */}
          <ToastContainer/>
        </>)
}
export default ViewRecords;