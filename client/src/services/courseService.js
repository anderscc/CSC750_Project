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

const BASEURL = 'http://127.0.0.1:8000/api/courses/'

export const addCourse = async (data)=>{
    return await axios.post(BASEURL, {...data})
        .catch(error => {
            throw error
        })
}

export const getCourse = async (id)=>{
     const Course = await axios.get(BASEURL + `${id}/`)
        .catch(error => {
            throw error
        })
    return Course.data
}

export const getAllCourse = async ()=>{
    const Courses = await axios.get(BASEURL)
        .catch(error => {
            throw error
        })
    return Courses.data
}

export const getAllCourseBySemYrID = async (semYr)=>{
    var Courses = await axios.get(BASEURL)
       .catch(error => {
           throw error
       })
       var len = Courses.data.length
       var newCourses = []
           for (let i = 0; i < len; i++){
               if (Courses.data[i]['semYr'] == semYr){
                   newCourses.push(Courses.data[i]);
               }
              }
   return newCourses
}

export const updateCourse = async (id, data)=>{

    return await axios.put(BASEURL + `${id}/`, {...data})
        .catch(error => {
            throw error
        })
}

export const deleteCourse = async (id)=>{

    return await axios.delete(BASEURL + `${id}/`)
        .catch(error => {
            throw error
        })
}
