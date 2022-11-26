import Cookie from 'js-cookie';
import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import { LoginFormProps } from 'components/modal/LoginModal';
import { UploadRoomFormProps } from 'routes/UploadRoom';
import { dateFormat } from './util';

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

interface IUploadImageVariables {
  file: FileList;
  uploadURL: string;
}

interface IUploadImageResponse {
  result: {
    filename: string;
    id: string;
    requireSignedURLs: boolean;
    uploaded: Date;
    variants: string[];
  };
}

export const uploadImage = async ({
  file,
  uploadURL,
}: IUploadImageVariables): Promise<IUploadImageResponse> => {
  const form = new FormData();
  form.append('file', file[0]);
  const response = await axios.post(uploadURL, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

interface ICreatePhotoVariables {
  roomPk: string;
  description: string;
  file: string;
}

export const createPhoto = ({
  roomPk,
  description,
  file,
}: ICreatePhotoVariables) =>
  axiosInstance
    .post(
      `rooms/${roomPk}/photos/`,
      { description, file },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.data);

export const checkBooking = ({
  queryKey,
}: QueryFunctionContext): Promise<{ ok: boolean }> => {
  const [_, roomPk, dates] = queryKey;
  // if (!dates) return;
  const [checkIn, checkOut] = dates as Date[];

  return axiosInstance
    .get(
      `rooms/${roomPk}/bookings/check?check_in=${dateFormat(
        checkIn
      )}&check_out=${dateFormat(checkOut)}`
    )
    .then((response) => response.data);
};
