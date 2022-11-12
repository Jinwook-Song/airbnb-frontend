import {
  Heading,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { githubLogIn } from 'lib/api';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      const status = await githubLogIn(code);
      switch (status) {
        case 200:
          toast({
            status: 'success',
            title: 'Welcome!',
            position: 'bottom-right',
            description: 'Happy to have you back!',
          });
          queryClient.refetchQueries(['me']);
          navigate('/');
          break;
        case 201:
          toast({
            status: 'success',
            title: 'Welcome!',
            position: 'bottom-right',
            description: 'Glad you join us',
          });
          queryClient.refetchQueries(['me']);
          navigate('/');
          break;
        case 400:
          break;
      }
    }
  };
  useEffect(() => {
    confirmLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gray = useColorModeValue('gray.100', 'gray.800');
  return (
    <VStack spacing={5} bg={gray} justifyContent={'center'} minH={'100vh'}>
      <Heading size={'lg'}>Processing log in...</Heading>
      <Text>Please wait for a moment</Text>
      <Spinner size={'lg'} />
    </VStack>
  );
}

export default GithubConfirm;
