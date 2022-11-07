import { useQuery } from '@tanstack/react-query';
import { getMe } from 'lib/api';

export default function useUser() {
  const {
    data,
    isLoading: userLoading,
    isError,
  } = useQuery(['me'], getMe, {
    retry: false,
  });
  return {
    userLoading,
    isLoggedIn: !isError,
    user: data,
  };
}
