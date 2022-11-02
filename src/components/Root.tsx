import { Box, Button, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { FaAirbnb } from 'react-icons/fa';
function Root() {
  return (
    <Box>
      <HStack
        justifyContent={'space-between'}
        px={10}
        py={5}
        borderBottomWidth={1}
      >
        <Box color={'red.500'}>
          <FaAirbnb size={48} />
        </Box>
        <HStack spacing={2}>
          <Button>Log in</Button>
          <Button colorScheme={'red'}>Sign up</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}

export default Root;
