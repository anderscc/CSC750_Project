// # Copyright (c) 2022 Caleb Bryant, Wenyu Zhao, Calvin Anderson, Godwin Ekuma, Oluwatobi Atolagbe
// #
// # Permission is hereby granted, free of charge, to any person obtaining a copy
// # of this software and associated documentation files (the "Software"), to deal
// # in the Software without restriction, including without limitation the rights
// # to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// # copies of the Software, and to permit persons to whom the Software is
// # furnished to do so, subject to the following conditions:
// #
// # The above copyright notice and this permission notice shall be included in all
// # copies or substantial portions of the Software.
// #
// # THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// # IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// # FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// # AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// # LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// # OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// # SOFTWARE
import axios from 'axios'

const BASEURL = 'http://127.0.0.1:8000/'

export const generateSchedules = async (semYr) => {
    const response = await axios.get(BASEURL + `generate_schedules?semYr=` +`${semYr}`, {responseType: 'blob'})
        .catch(error => {
            throw error
            
        })

        const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `GAS_Schedule_${Date.now()}.xlsx`); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

}

export const downloadSchedules = async (semYr) => {
     const response = await axios.get(BASEURL + `download_schedules?semYr=` + `${semYr}`, {responseType: 'blob'})
        .catch(error => {
            throw error
        })

    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `GAS_Schedule_${Date.now()}.xlsx`); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    }

export const getAllSchedules = async()=>{
    return await axios.get('http://127.0.0.1:8000/api/schedules/')
        .catch(error=>{
            throw error
        })
}

export const downloadSchedule = async (semYr, schedule_id) => {
     const response = await axios.get(BASEURL + `download_schedule?semYr=` + `${semYr}&schedule_id=${schedule_id}`, {responseType: 'blob'})
        .catch(error => {
            throw error
        })

    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `GAS_Schedule_${schedule_id}_${Date.now()}.xlsx`); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
    }

export const deleteSchedule = async (schedule_id) => {
     const response = await axios.delete(BASEURL + `api/schedules/` + `${schedule_id}`, {responseType: 'blob'})
        .catch(error => {
            throw error
        })}    