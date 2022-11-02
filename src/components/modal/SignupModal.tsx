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
import { FaEnvelope, FaLock, FaTag, FaUserNinja } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SignupModal({ isOpen, onClose }: LoginModalProps) {
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
                    <FaTag />
                  </Box>
                }
              />
              <Input
                focusBorderColor={'none'}
                variant={'outline'}
                placeholder='Name'
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon
                bg={'gray.200'}
                children={
                  <Box color={'gray.500'}>
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                focusBorderColor={'none'}
                variant={'outline'}
                placeholder='Email'
              />
            </InputGroup>
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
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SignupModal;
