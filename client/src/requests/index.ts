import axios from 'axios';
import { getToken } from '../utils/tokenHandler';
import https from 'https';

const inProduction = process.env.NODE_ENV === 'production';

//TODO: add the domain of the website after deploying it
export const baseURL = inProduction ? process.env.REACT_APP_BASE_URL_PROD : process.env.REACT_APP_BASE_URL_DEV;

const instance = axios.create({
  baseURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config!.headers!.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
export const axiosMain = axios;
export default instance;
