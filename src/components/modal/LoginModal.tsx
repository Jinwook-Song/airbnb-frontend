import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import SocialLogin from 'components/SocialLogin';
import { FaLock, FaUserNinja } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
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
          <Button mt={4} w='full' colorScheme='red'>
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
