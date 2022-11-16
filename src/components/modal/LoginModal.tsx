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
  Text,
  VStack,
} from '@chakra-ui/react';
import SocialLogin from 'components/SocialLogin';
import { useForm } from 'react-hook-form';
import { FaLock, FaUserNinja } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IForm>();

  function onValid() {
    console.log(getValues());
  }
  return (
    <Modal motionPreset='slideInBottom' onClose={onClose} isOpen={isOpen}>
      <ModalOverlay
        bg='blackAlpha.700'
        backdropFilter='blur(2px) hue-rotate(90deg)'
      />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={'form'} onSubmit={handleSubmit(onValid)}>
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
                {...register('username', {
                  required: 'Username is required',
                })}
                isInvalid={Boolean(errors.username?.message)}
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
                {...register('password', {
                  required: 'Password is required',
                })}
                isInvalid={Boolean(errors.password?.message)}
                focusBorderColor={'none'}
                variant={'outline'}
                placeholder='Password'
              />
            </InputGroup>
          </VStack>
          <Button type='submit' mt={4} w='full' colorScheme='red'>
            Log in
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
