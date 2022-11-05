import {
  Button,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NotFound() {
  const gray = useColorModeValue('gray.100', 'gray.800');
  return (
    <VStack spacing={5} bg={gray} justifyContent={'center'} minH={'100vh'}>
      <Heading>Page not found.</Heading>
      <Text>It seems that you're lost.</Text>
      <Link to='/' replace>
        <Button variant={'link'} colorScheme={'red'}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}

export default NotFound;
