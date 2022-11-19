import useUser from 'lib/hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IHostOnlyPageProps {
  children: React.ReactNode;
}

function HostOnlyPage({ children }: IHostOnlyPageProps) {
  const { user, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate('/', { replace: true });
      }
    }
  }, [navigate, userLoading, user]);
  return <>{children}</>;
}

export default HostOnlyPage;
