import axios from 'axios'

const BASEURL = 'http://127.0.0.1:8000/'

export const generateSchedule = async (semYr) => {
    return await axios.post(BASEURL + `generate_schedule?/semYr=` +`${semYr}/`)
        .catch(error => {
            throw error
        })

}

export const downloadSchedule = async (semYr) => {
    return await axios.post(BASEURL + `download_schedule?/semYr=` + `${semYr}/`)
        .catch(error => {
            throw error
        })
    }
export const getAllSchedules = async()=>{
    return await axios.get('http://127.0.0.1:8000/api/schedules/')
        .catch(error=>{
            throw error
        })
}
