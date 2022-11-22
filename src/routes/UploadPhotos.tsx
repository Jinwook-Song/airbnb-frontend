import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import ProtectedPage from 'components/middleware/ProtectedPage';
import useHostOnly from 'lib/hooks/useHostOnly';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export default function UploadPhotos() {
  const { register, watch } = useForm();
  const { roomPk } = useParams();
  useHostOnly();
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={'center'}>Upload a Photo</Heading>
          <VStack spacing={5} mt={10}>
            <FormControl>
              <FormLabel
                w='full'
                border={'dashed'}
                py={'28'}
                rounded={'lg'}
                cursor={'pointer'}
                colorScheme={'red'}
              >
                <Flex w={'full'} justifyContent='center' alignItems={'center'}>
                  <FaPlus />
                </Flex>
              </FormLabel>
              <Input
                {...register('file')}
                type='file'
                accept='image/*'
                hidden
              />
            </FormControl>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
