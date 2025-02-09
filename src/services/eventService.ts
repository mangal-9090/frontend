import axios from "axios";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/events`;

export const fetchEvents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEvent = async (eventData: any) => {
  const response = await axios.post(API_URL, eventData);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
