import Cookie from 'js-cookie';
import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import { LoginFormProps } from 'components/modal/LoginModal';
import { UploadRoomFormProps } from 'routes/UploadRoom';
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

export const getMe = async () =>
  axiosInstance.get('users/me').then((response) => response.data);

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
      `users/github`,
      { code },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogin = (code: string) =>
  axiosInstance
    .post(
      `users/kakao`,
      { code },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);

export const manualLogin = ({ username, password }: LoginFormProps) =>
  axiosInstance
    .post(
      `users/log-in`,
      { username, password },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);

export const getAmenities = () =>
  axiosInstance.get('rooms/amenities/').then((response) => response.data);

export const getCategories = () =>
  axiosInstance.get('categories').then((response) => response.data);

export const uploadRoom = (roomInfo: UploadRoomFormProps) =>
  axiosInstance
    .post(`rooms/`, roomInfo, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);

export const getUploadURL = () =>
  axiosInstance
    .post('medias/photos/get-url', null, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);
