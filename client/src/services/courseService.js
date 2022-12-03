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


export const updateCourse = async (id, data)=>{

    return await axios.put(BASEURL + `${id}/`, {...data})
        .catch(error => {
            throw error
        })
}
