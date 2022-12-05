import axios from 'axios'

const BASEURL = 'http://127.0.0.1:8000/api/semYear/'

export const createSemester = async (Year, Semester) =>{
        return await axios.post(BASEURL, { Year, Semester })
        .catch(error => {
            throw error
        })
}

export const getAllSemester = async ()=>{
     const semester = await axios.get(BASEURL)
        .catch(error => {
            throw error
            return {}
        })
    return semester.data;
}
