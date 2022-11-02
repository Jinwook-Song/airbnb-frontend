import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <VStack spacing={5} bg='gray.100' justifyContent={'center'} minH={'100vh'}>
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
