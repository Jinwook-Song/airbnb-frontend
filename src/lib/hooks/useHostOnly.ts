import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from './useUser';

function useHostOnly() {
  const { user, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate('/', { replace: true });
      }
    }
  }, [navigate, userLoading, user]);
  return;
}

export default useHostOnly;
