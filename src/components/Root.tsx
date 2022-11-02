import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from './layout/Header';
function Root() {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
}

export default Root;
