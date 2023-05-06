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

const BASEURL = 'http://127.0.0.1:8000/api/labs/'

export const addLab = async (data)=>{
    console.log(data)
    return await axios.post(BASEURL, {...data})
        .catch(error => {
            console.log(error)
            console.log(error.request.response)
            throw error
        })
}

export const getLab = async (id)=>{
     const Lab = await axios.get(BASEURL + `${id}/`)
        .catch(error => {
            throw error
        })
    return Lab.data
}

export const getAllLab = async ()=>{
     const Labs = await axios.get(BASEURL)
        .catch(error => {
            throw error
        })
    return Labs.data
}

export const getAllLabBySemYrID = async (semYr)=>{
    const Labs = await axios.get(BASEURL)
       .catch(error => {
           throw error
       })
    var len = Labs.data.length
    var newLabs = []
    for (let i =0; i < len; i++){
        if(Labs.data[i]['semYr'] == semYr){
            newLabs.push(Labs.data[i]);
        }
    }
   return newLabs
}


export const updateLab = async (id, data)=>{
    return await axios.put(BASEURL + `${id}/`, {...data})
        .catch(error => {
            throw error
        })
}

export const deleteLab = async (id)=>{
    return await axios.delete(BASEURL + `${id}/`)
        .catch(error => {
            throw error
        })
}
