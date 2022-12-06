import axios from 'axios'

const BASEURL = 'http://127.0.0.1:8000/api/labs/'

export const addLab = async (data)=>{

    return await axios.post(BASEURL, {...data})
        .catch(error => {
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
