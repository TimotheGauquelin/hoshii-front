import axios from 'axios'

const instance = (token) => { return axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
        Authorization : `Bearer ${token && token}`
        }
})}

export default instance