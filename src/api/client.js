import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach the JWT token to every request if logged in
client.interceptors.request.use(config => {
  const token = localStorage.getItem('godfest_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;