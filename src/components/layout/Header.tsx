import {
  Box,
  Button,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import LoginModal from 'components/modal/LoginModal';
import SignupModal from 'components/modal/SignupModal';
import { FaAirbnb, FaMoon } from 'react-icons/fa';

function Header() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onClose: onSignupClose,
    onOpen: onSignupOpen,
  } = useDisclosure();

  return (
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
        <IconButton
          aria-label='toggle dark mode'
          icon={<FaMoon />}
          variant={'ghost'}
        />
        <Button onClick={onLoginOpen}>Log in</Button>
        <Button onClick={onSignupOpen} colorScheme={'red'}>
          Sign up
        </Button>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}

export default Header;
