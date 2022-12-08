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



import React, {useEffect} from "react";
import { useState } from 'react';
import { Space, Table, Typography, Popconfirm } from 'antd';
import {downloadSchedule, deleteSchedule, getAllSchedules} from "../services/scheduleService";
import { ToastContainer, toast } from 'react-toastify';


const ViewSchedule = () =>/*<Table columns={columns} dataSource={data} />;*/{

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
  const [schedules, setSchedules] = useState([])
  useEffect(() => {
    const getData = async () => {
        const schedulesData = await getAllSchedules()
        setSchedules(schedulesData)
    }
    getData()},[]);
    console.log(schedules.data)
  
    const call_deleteSchedule = async (id)=>{
        console.log("Deleting..")
        try{
            const response = await deleteSchedule(id)
            if (response!= "error"){
                console.log(response)
                message_toast('success','The schedule is deleted!')
            }
            else{
                console.log(response)
                message_toast('','Unable to delete, please refresh or contact developer.')
            }
        }
        catch (errInfo) {
            message_toast('',"Unable to delete, please refresh; or check your browser's CORS policy; or contact developer.")} 
        }

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
        title: 'Number of Conflicts',
        dataIndex: 'conflicts',
        key: 'conflicts',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            {/*Action to generate the schedule*/}
            <Typography.Link onClick={()=>download(record.semYr, record.id)} >Download</Typography.Link>
            {/*Action to delete the schedule, onConfirm={}*/}
            <Popconfirm title="Sure to delete?" onConfirm={()=>call_deleteSchedule(record.id)}><a>Delete</a></Popconfirm>
          </Space>
        ),}]

  const download = async (semYr,id) =>{
    console.log(semYr,typeof(semYr))
        try{
          const response = await downloadSchedule(semYr, id)
          message_toast('success','Dowloading schedule...!')
        }catch (errInfo){
          message_toast('','Unable to download, please contact developer.')
            
        }
      }

 return(
  <>
  <Table columns={columns} dataSource={schedules.data} />
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



export default ViewSchedule;
