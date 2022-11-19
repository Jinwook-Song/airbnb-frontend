import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SocialLogin from 'components/SocialLogin';
import { LoginFormProps, manualLogin } from 'lib/api';
import { useForm } from 'react-hook-form';
import { FaLock, FaUserNinja } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<LoginFormProps>();

  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(manualLogin, {
    onMutate: () => {
      console.log('mutation starting');
    },
    onSuccess: (data) => {
      console.log('✅', data);
      toast({
        status: 'success',
        title: 'Welcome!',
        position: 'bottom-right',
        description: 'Happy to have you back!',
      });
      onClose();
      reset();
      queryClient.refetchQueries(['me']);
    },
    onError: (error) => {
      console.log('mutation has an error');
    },
  });

  function onValid() {
    mutation.mutate({ ...getValues() });
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
                type='password'
                isInvalid={Boolean(errors.password?.message)}
                focusBorderColor={'none'}
                variant={'outline'}
                placeholder='Password'
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color={'red'} fontSize='sm'>
              Username or Password is wrong
            </Text>
          ) : null}
          <LightMode>
            <Button
              isLoading={mutation.isLoading}
              type='submit'
              mt={4}
              w='full'
              colorScheme='red'
            >
              Log in
            </Button>
          </LightMode>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
