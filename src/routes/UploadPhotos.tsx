import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  LightMode,
  VStack,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import ProtectedPage from 'components/middleware/ProtectedPage';
import { getUploadURL } from 'lib/api';
import useHostOnly from 'lib/hooks/useHostOnly';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

interface IForm {
  photo: FileList;
}

export default function UploadPhotos() {
  useHostOnly();
  const { register, handleSubmit, getValues, watch, reset } = useForm<IForm>();
  const mutation = useMutation(getUploadURL, {
    onSuccess: (data: any) => {
      console.log('✅', data);
    },
  });
  const { roomPk } = useParams();

  const onValid = () => {
    console.log(getValues());
    mutation.mutate();
  };

  const photo = watch('photo');
  const [photoPreview, setPhotoPreview] = useState('');
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0];
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview('');
    }
  }, [photo]);

  console.log(photo);

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
          <VStack
            as={'form'}
            onSubmit={handleSubmit(onValid)}
            spacing={5}
            mt={10}
          >
            <FormControl>
              {photoPreview ? (
                <VStack>
                  <AspectRatio
                    w='full'
                    rounded={'lg'}
                    overflow='hidden'
                    ratio={16 / 9}
                  >
                    <Image w='full' src={photoPreview} objectFit='cover' />
                  </AspectRatio>
                  <Button w='full' colorScheme={'gray'} onClick={() => reset()}>
                    Cancel
                  </Button>
                </VStack>
              ) : (
                <FormLabel
                  w='full'
                  border={'dashed'}
                  py={'28'}
                  rounded={'lg'}
                  cursor={'pointer'}
                  _groupHover={{
                    border: 'red dashed',
                  }}
                >
                  <Flex
                    w={'full'}
                    justifyContent='center'
                    alignItems={'center'}
                    _groupHover={{
                      textColor: 'red',
                    }}
                  >
                    <FaPlus />
                  </Flex>
                </FormLabel>
              )}
              <Input
                {...register('photo')}
                type='file'
                accept='image/*'
                hidden
              />
            </FormControl>
            <LightMode>
              <Button
                disabled={!photo || photo?.length < 1}
                type='submit'
                w='full'
                colorScheme={'red'}
              >
                Upload
              </Button>
            </LightMode>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}
