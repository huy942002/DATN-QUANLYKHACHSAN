import axios from 'axios';

const config = {
    // baseUrl: process.env.REACT_APP_API_ENDPOINT,
    baseUrl: 'http://localhost:8080/api/',
    options: {
        headers: { 'content-type': 'application/json' },
    },
};

const http = axios.create(config);

const httpGet = async (endpoint) => {
    return await http
        .get(`${config.baseUrl}${endpoint}`)
        .then((res) => handleResponse(res))
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
};

const httpPost = async (endpoint, data) => {
    return await http
        .post(`${config.baseUrl}${endpoint}`, data)
        .then((res) => handleResponse(res))
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
};

const httpPut = async (endpoint, data) => {
    return await http
        .put(`${config.baseUrl}${endpoint}`, data)
        .then((res) => handleResponse(res))
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
};

const httpDelete = async (endpoint, data) => {
    return await http
        .delete(`${config.baseUrl}${endpoint}/${data.id}`)
        .then((res) => handleResponse(res))
        .catch((error) => {
            console.error(error);
            throw Error(error);
        });
};

const handleResponse = (response) => {
    // You can handle 400 errors as well.
    if (response.status === 200) {
        return response.data;
    } else {
        throw Error(response.data | 'error');
    }
};

export default { httpGet, httpPost, httpPut, httpDelete };
