// launchService.ts
import axios from "axios";
import type { LaunchFormData } from "../schemas/launchSchema";

const API_URL = "http://localhost:3000/launches";

export async function createLaunch(data: LaunchFormData) {
  return axios.post(API_URL, data);
}

export async function fetchLaunches() {
  const response = await axios.get(API_URL);
  return response.data;
}