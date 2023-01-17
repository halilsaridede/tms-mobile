import axios from 'axios';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['X-CSRF-TOKEN'] = token_var;

export const AxiosClient = axios.create({
  // baseURL: 'https://aa01-2a02-4e0-2d0d-a19-c064-5e0e-8d5d-ef8f.eu.ngrok.io',
  // baseURL: 'http://127.0.0.1:8000',
  baseURL: 'https://tms-project.herokuapp.com',
});