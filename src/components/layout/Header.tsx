import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import LoginModal from 'components/modal/LoginModal';
import SignupModal from 'components/modal/SignupModal';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';

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

  const { toggleColorMode } = useColorMode();
  // useColorModeValue(Ligth, Dark)
  const logoColor = useColorModeValue('red.500', 'red.200');
  const Icon = useColorModeValue(FaMoon, FaSun);

  return (
    <HStack
      justifyContent={'space-between'}
      px={10}
      py={5}
      borderBottomWidth={1}
    >
      <Box color={logoColor}>
        <FaAirbnb size={48} />
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          aria-label='toggle dark mode'
          icon={<Icon />}
          variant={'ghost'}
        />
        <Button onClick={onLoginOpen}>Log in</Button>
        {/* Force color */}
        <LightMode>
          <Button onClick={onSignupOpen} colorScheme={'red'}>
            Sign up
          </Button>
        </LightMode>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}

export default Header;
