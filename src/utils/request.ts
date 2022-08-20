import axios from 'axios';

const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 3000,
});

request.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token');
    const headers = {
      Authorization: token,
    };
    return { ...config, headers };
  },
  error => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default request;
