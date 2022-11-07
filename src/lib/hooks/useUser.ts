import { useQuery } from '@tanstack/react-query';
import { getMe } from 'lib/api';
import { IUser } from 'types';

export default function useUser() {
  const {
    data,
    isLoading: userLoading,
    isError,
  } = useQuery<IUser>(['me'], getMe, {
    retry: false,
  });
  return {
    userLoading,
    isLoggedIn: !isError,
    user: data,
  };
}
