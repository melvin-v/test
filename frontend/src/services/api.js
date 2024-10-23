import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // Simulación con una API pública
});

export const getData = (endpoint) => api.get(endpoint);
export const postData = (endpoint, data) => api.post(endpoint, data);
