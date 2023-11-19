import axios from 'axios';

export const url = process.env.REACT_APP_SERVER_URL

const $axios = axios.create({
  withCredentials: true,
  baseURL: url,
})

$axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

export default $axios;