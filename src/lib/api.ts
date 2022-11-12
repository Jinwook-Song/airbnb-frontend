import Cookie from 'js-cookie';
import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  withCredentials: true, // API 요청시 쿠키를 보냄
});

export const getRooms = () =>
  axiosInstance.get('rooms/').then((response) => response.data);

export const getRoom = async ({ queryKey }: QueryFunctionContext) => {
  return axiosInstance
    .get(`rooms/${queryKey[1]}/`)
    .then((response) => response.data);
};

export const getRoomreviews = async ({ queryKey }: QueryFunctionContext) => {
  return axiosInstance
    .get(`rooms/${queryKey[1]}/reviews/`)
    .then((response) => response.data);
};

export const getMe = async () => {
  return axiosInstance.get('users/me').then((response) => response.data);
};

export const logOut = () =>
  axiosInstance
    .post('users/log-out', null, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);

export const githubLogIn = (code: string) =>
  axiosInstance
    .post(
      `/users/github`,
      { code },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);
