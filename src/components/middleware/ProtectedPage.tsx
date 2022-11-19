import useUser from 'lib/hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProtectedPageProps {
  children: React.ReactNode;
}

function ProtectedPage({ children }: IProtectedPageProps) {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate('/', { replace: true });
      }
    }
  }, [navigate, userLoading, isLoggedIn]);
  return <>{children}</>;
}

export default ProtectedPage;
