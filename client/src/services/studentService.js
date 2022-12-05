import axios from 'axios'

const BASEURL = 'http://127.0.0.1:8000/api/gata/'

export const addStudent = async (data)=>{

    return await axios.post(BASEURL, {...data})
        .catch(error => {
            throw error
        })
}

export const getStudent = async (id)=>{
     const student = await axios.get(BASEURL + `${id}/`)
        .catch(error => {
            throw error
        })
    return student.data
}

export const getAllStudent = async ()=>{
     const students = await axios.get(BASEURL)
        .catch(error => {
            throw error
        })
    return students.data
}


export const updateStudent = async (id, data)=>{

    return await axios.put(BASEURL + `${id}/`, {...data})
        .catch(error => {
            throw error
        })
}

export const deleteStudent = async (id, data)=>{

    return await axios.delete(BASEURL + `${id}/`, {...data})
        .catch(error => {
            throw error
        })
}