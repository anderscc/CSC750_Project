
import React, {Component, useEffect} from "react";
import { useState } from 'react';
import { Space, Table, Typography, Popconfirm } from 'antd';

//it'll be one table
//get the data from api probably in array format
//go through each row of the array and display in the table
//[CSC701,Godwin Ekuma,...etc] dummy data array

//Needs to be a button that 
//Automatic download as well as click download


//<button r"../schedule.csv" - relative path
//take array file and convert into csv file in front-end

// var array = [ "geeks", "4", "geeks" ];
// var csv = array.toString();
// document.write(csv);

// import api 
// import {getAllSchedule} from "../services/scheduleService"

const columns = [
  {
    title: 'Schedule Id',
    dataIndex: 'scheduleId',
    key: 'scheduleId',
    //render: (text) => <a>{text}</a>,
  },
  {
    title: 'Semester Year',
    dataIndex: 'semYr',
    key: 'semYr',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {/*Action to save the schedule*/}
        <Typography.Link >Download</Typography.Link>
        {/*Action to delete the schedule, onConfirm={}*/}
        <Popconfirm title="Sure to delete?" ><a>Delete</a></Popconfirm>
      </Space>
    ),
  }
]

const data = [
  {
    scheduleId: '1',
    semYr:"Fall 2022"
  },
  {
    scheduleId: '2',
    semYr:"Fall 2022"
  },
  {
    scheduleId: '3',
    semYr:"Spring 2022"
  }
]


const ViewSchedule = () =><Table columns={columns} dataSource={data} />;
  {/*const [schedules, setSchedules] = useState([])

  useEffect(() => {
    const getData = async () => {
        const schedulesData = await getAllSchedules()
        setSchedules(schedulesData)
    }
    getData()},[]);*/}


  

export default ViewSchedule;
