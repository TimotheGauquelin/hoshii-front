import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
        Authorization : `Bearer ${localStorage.getItem("access_token") && localStorage.getItem("access_token")}`
        }
})

export default instance