import axios from 'axios';
import { Launch } from '../types/Launch';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // ajuste conforme seu backend
});

export const getLaunches = async () => {
  const response = await api.get<Launch[]>('/launches');
  return response.data;
};

export const createLaunch = async (data: Omit<Launch, 'id'>) => {
  const response = await api.post<Launch>('/launches', data);
  return response.data;
};