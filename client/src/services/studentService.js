import axios from 'axios'

const BASEURL = 'http://127.0.0.1:8000/api/gata/'

export const addStudent = async (data)=>{

    return await axios.post(BASEURL, {...data})
        .catch(error => {
            alert(" an error occurred")
        })
}

export const getStudent = async (id)=>{
     const student = await axios.get(BASEURL + `${id}/`)
        .catch(error => {
            alert(" an error occurred")
        })
    return student
}

export const getAllStudent = async (id)=>{
     const students = await axios.get(BASEURL)
        .catch(error => {
            alert(" an error occurred")
        })
    return students
}


export const updateStudent = async (id, data)=>{

    return await axios.put(BASEURL + `${id}/`, {...data})
        .catch(error => {
            alert(" an error occurred")
        })
}
