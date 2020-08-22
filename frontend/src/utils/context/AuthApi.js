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
  (err) => {
    return Promise.reject(err);
  }
);

// Update / Set Token
export const updateToken = (userData) => {
  const storedToken = localStorage.getItem('token');
  if (userData && !storedToken) {
    // If not not set, create token.
    localStorage.setItem('token', JSON.stringify(userData));
  }
}

export default instance;