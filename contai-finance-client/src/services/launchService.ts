// launchService.ts
import axios from "axios";
import api from "./api";

const API_URL = "http://localhost:3000/launches";

export const createLaunch = async (data: {
  description: string;
  type: 'Credit' | 'Debit';
  amount: number;
  date: string;
}) => {
  await api.post('/launches', {
    title: data.description,
    type: data.type.toLowerCase(),
    value: data.amount,
    category: 'General',
    launchDate: new Date(data.date).toISOString(),
  });
};

export async function fetchLaunches() {
  const response = await axios.get(API_URL);
  return response.data;
}