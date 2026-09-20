### FILE: src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

let authToken = null;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  config => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const setAuthToken = token => {
  authToken = token;
};

export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  const { token } = response.data;
  setAuthToken(token);
  return response.data;
};

export const getChannels = async () => {
  const response = await apiClient.get('/channels');
  return response.data;
};

export const getChannelById = async id => {
  const response = await apiClient.get(`/channels/${id}`);
  return response.data;
};

export const createChannel = async channelData => {
  const response = await apiClient.post('/channels', channelData);
  return response.data;
};

export const updateChannel = async (id, channelData) => {
  const response = await apiClient.put(`/channels/${id}`, channelData);
  return response.data;
};

export const deleteChannel = async id => {
  const response = await apiClient.delete(`/channels/${id}`);
  return response.data;
};

export default apiClient;