import axios from 'axios'

const BASEURL = 'http://127.0.0.1:8000/'

export const generateSchedule = async (semYr) => {
    const response = await axios.get(BASEURL + `generate_schedule?semYr=` +`${semYr}`, {responseType: 'blob'})
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

export const downloadSchedule = async (semYr) => {
     const response = await axios.get(BASEURL + `download_schedule?semYr=` + `${semYr}`, {responseType: 'blob'})
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
