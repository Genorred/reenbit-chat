import axios from "axios";

const baseURL=import.meta.env.VITE_API_URL || 'http://localhost:5000/'

export const $host = axios.create({
    baseURL: baseURL,
})
export const $authHost = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})