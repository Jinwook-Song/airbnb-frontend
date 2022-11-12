import {
  Heading,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { githubLogIn } from 'lib/api';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function GithubConfirm() {
  const { search } = useLocation();

  async function confirmLogin() {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (!code) return;
    await githubLogIn(code);
  }
  useEffect(() => {
    confirmLogin();
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
