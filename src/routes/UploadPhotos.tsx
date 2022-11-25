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
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import ProtectedPage from 'components/middleware/ProtectedPage';
import { createPhoto, getUploadURL, uploadImage } from 'lib/api';
import useHostOnly from 'lib/hooks/useHostOnly';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

interface IForm {
  photo: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  useHostOnly();
  const toast = useToast();
  const { roomPk } = useParams();
  const { register, handleSubmit, getValues, watch, reset } = useForm<IForm>();
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      reset();
      toast({
        status: 'success',
        title: 'Uploaded!',
        position: 'bottom-right',
      });
    },
  });
  const uploadImageMutaion = useMutation(uploadImage, {
    onSuccess: ({ result }) => {
      createPhotoMutation.mutate({
        roomPk: roomPk!,
        description: result.filename,
        file: result.variants[0],
      });
    },
  });
  const uploadURLMuation = useMutation<IUploadURLResponse>(getUploadURL, {
    onSuccess: ({ id, uploadURL }) => {
      uploadImageMutaion.mutate({ file: getValues('photo'), uploadURL });
    },
  });

  const onValid = () => {
    console.log(getValues());
    uploadURLMuation.mutate();
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
                  <Button
                    disabled={
                      uploadURLMuation.isLoading ||
                      uploadImageMutaion.isLoading ||
                      createPhotoMutation.isLoading
                    }
                    w='full'
                    colorScheme={'gray'}
                    onClick={() => reset()}
                  >
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
                isLoading={
                  uploadURLMuation.isLoading ||
                  uploadImageMutaion.isLoading ||
                  createPhotoMutation.isLoading
                }
                disabled={
                  !photo ||
                  photo?.length < 1 ||
                  uploadURLMuation.isLoading ||
                  uploadImageMutaion.isLoading ||
                  createPhotoMutation.isLoading
                }
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
