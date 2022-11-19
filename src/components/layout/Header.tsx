import {
  Box,
  Button,
  IconButton,
  LightMode,
  HStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  ToastId,
} from '@chakra-ui/react';
import LoginModal from 'components/modal/LoginModal';
import SignupModal from 'components/modal/SignupModal';
import { logOut } from 'lib/api';
import useUser from 'lib/hooks/useUser';
import { FaAirbnb, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
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
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: 'Login out..',
        description: 'Sad to see you go...',
        status: 'loading',
        position: 'bottom-right',
        isClosable: true,
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(['me']);
        toast.update(toastId.current, {
          title: 'Done!',
          description: 'See you later!',
          status: 'success',
          duration: 1000,
        });
      }
    },
  });

  function handleLogOut() {
    mutation.mutate();
  }

  return (
    <HStack
      justifyContent={'space-between'}
      px={{
        base: 10,
        lg: 40,
      }}
      py={5}
      borderBottomWidth={1}
    >
      <Link to='/'>
        <Box color={logoColor}>
          <FaAirbnb size={48} />
        </Box>
      </Link>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          aria-label='toggle dark mode'
          icon={<Icon />}
          variant={'ghost'}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              {/* Force color */}
              <LightMode>
                <Button onClick={onSignupOpen} colorScheme={'red'}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.username} src={user?.avatar} size={'md'} />
              </MenuButton>
              <MenuList>
                {user?.is_host && (
                  <Link to={'/rooms/upload'}>
                    <MenuItem>Upload room</MenuItem>
                  </Link>
                )}
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}

export default Header;
