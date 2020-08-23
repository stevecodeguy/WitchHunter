import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', //axios.get('/login') == 'http://yourwebsite.url/api/login' 
  withCredentials: true
});

// Axios Instance
instance.interceptors.request.use(
  async (config) => {
    // Set Local Storage Token
    const token = await localStorage.getItem('token');
    if (token) {
      // Set Headers from Token
      config.headers.Authorization = `Bearer ${JSON.parse(token).authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    console.log('axios res', response);
    const storedToken = localStorage.getItem('token');
    if (response.data.uuid && !storedToken) {
      // If not not set, create token.
      const data = { uuid: response.data.uuid, timestamp: new Date().getTime() }
      localStorage.setItem('token', JSON.stringify(data));
    }
    return response;
  }, (error) => {
    return Promise.reject(error);
  }
);

export default instance;