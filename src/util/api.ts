import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
});

export const getRooms = () =>
  axiosInstance.get('rooms/').then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) =>
  axiosInstance.get(`rooms/${queryKey[1]}`).then((response) => response.data);
