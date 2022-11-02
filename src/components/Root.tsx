import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { FaAirbnb, FaLock, FaMoon, FaUserNinja } from 'react-icons/fa';
function Root() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <IconButton
            aria-label='toggle dark mode'
            icon={<FaMoon />}
            variant={'ghost'}
          />
          <Button onClick={onOpen}>Log in</Button>
          <Button colorScheme={'red'}>Sign up</Button>
        </HStack>
        <Modal motionPreset='slideInBottom' onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Log in</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <InputGroup>
                  <InputLeftAddon
                    bg={'gray.200'}
                    children={
                      <Box color={'gray.500'}>
                        <FaUserNinja />
                      </Box>
                    }
                  />
                  <Input
                    focusBorderColor={'none'}
                    variant={'outline'}
                    placeholder='Username'
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon
                    bg={'gray.200'}
                    children={
                      <Box color={'gray.500'}>
                        <FaLock />
                      </Box>
                    }
                  />
                  <Input
                    focusBorderColor={'none'}
                    variant={'outline'}
                    placeholder='Password'
                  />
                </InputGroup>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button w={'100%'} colorScheme='red'>
                Log in
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>
      <Outlet />
    </Box>
  );
}

export default Root;
