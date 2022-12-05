
import React, {Component, useEffect} from "react";
import { useState } from 'react';
import { Space, Table, Typography, Popconfirm } from 'antd';
import {generateSchedules, downloadSchedule,getAllSchedules} from "../services/scheduleService";


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



//id conflicts semester year
//

//Assignment ID, GATAid, semYr, ScheduleNum, MeetTimes, Courses
//[
// [1,1,"Fall22","CALEB B.",""Mr. Incredible,CSC 125.002,M 3:00 - 4:30,16,16,2,4 
// [1,2,"Fall22","WENYU Z.","Jack Jack,CSC 197.002,T 3:00 - 4:30,6,6,3,5 
// [1,3,"Fall22","GODWIN E.","Ms. Incredible,CSC 226.002,W 5:30 - 6:30,6.5,6.5,2.5,4.5 
// [1,4,"Fall22","OLUWATOBI A.","Dash,CSC 121.002,R 4:05 - 6:05,16.5,16.5,1.5,3.5 
// [1,5,"Fall22","Dash","None",CSC 121.001,R 2:00 - 4:00,None,None,None,1.5 
// [1,6,"Fall22","Ms. Incredible","None",CSC 226.001,W 4:00 - 5:00,None,None,None,2.5 
// [1,7,"Fall22","Jack Jack","None",CSC 197.001,T 1:00 - 2:30,None,None,None,3 
// [1,8,"Fall22","Mr. Incredible","None",CSC 125.001,M 1:00 - 2:30,None,None,None,2 
// [1,9,"Fall22","CALVIN A.","None",CSC 799.001,M 11:00 - 12:00,16,16,2,None 
// [1,10,"Fall22","OLUWATOBI A.","None",CSC 755.001,M 1:00 - 3:00,14.5,14.5,2,None 
// [1,11,"Fall22","GODWIN E.","None",CSC 750.001,M 5:00 - 7:30,4.5,4.5,2,None 
// [1,12,"Fall22","WENYU Z.","None",CSC 747.001,R 10:00 - 12:00,4,4,2,None 
// [1,13,"Fall22","CALVIN A.","None",CSC 790.001,TW 11:00 - 12:00,14,14,2,None 
// [1,14,"Fall22","CALEB B.","None",CSC 765.001,F 1:00 - 2:30,14,14,2,None 
// [1,15,"Fall22","WENYU Z.","None",CSC 746.001,T 4:00 - 5:15,2,2,2,None 
// [1,16,"Fall22","GODWIN E.","None",CSC 745.001,W 9:00 - 10:15,2.5,2.5,2,None 
// [1,17,"Fall22","OLUWATOBI A.","None",CSC 742.001,TR 3:30 - 4:45,12.5,12.5,2,None 
// [1,18,"Fall22","CALVIN A.","None",CSC 737.001,T 9:00 - 10:00,12,12,2,None 
// [1,19,"Fall22","CALEB B.","None",CSC 736.001,F 09:00 - 11:00,12,12,2,None]
// ]


/*const data = [
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
]*/



const ViewSchedule = () =>/*<Table columns={columns} dataSource={data} />;*/{
  const [schedules, setSchedules] = useState([])
  useEffect(() => {
    const getData = async () => {
        const schedulesData = await getAllSchedules()
        setSchedules(schedulesData)
    }
    getData()},[]);
    console.log(schedules.data)
   

    const columns = [
      {
        title: 'Schedule Id',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
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
            {/*Action to generate the schedule*/}
            <Typography.Link onClick={()=>download(record.scheduleId)} >Download</Typography.Link>
            {/*Action to delete the schedule, onConfirm={}*/}
            <Popconfirm title="Sure to delete?" ><a>Delete</a></Popconfirm>
          </Space>
        ),}]

  const download = async (semYr) =>{
    console.log(semYr)
        try{
          const response = await downloadSchedule(semYr)
        }catch (errInfo){
          console.log('Could not download schedule:', errInfo)
        }
      }

 return(<Table columns={columns} dataSource={schedules.data} />)}
  



export default ViewSchedule;
