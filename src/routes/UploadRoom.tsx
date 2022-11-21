import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  LightMode,
  Select,
  Skeleton,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import ProtectedPage from 'components/middleware/ProtectedPage';
import { getAmenities, getCategories, uploadRoom } from 'lib/api';
import useHostOnly from 'lib/hooks/useHostOnly';
import { useForm } from 'react-hook-form';
import { FaBed, FaDollarSign, FaToilet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { IAmenity, ICategory } from 'types';

export interface UploadRoomFormProps {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_allowed: boolean;
  kind: string;
  owner: string;
  amenities: number[];
  category: number;
}

function UploadRoom() {
  useHostOnly();

  const toast = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, getValues } = useForm<UploadRoomFormProps>({
    mode: 'onChange',
    defaultValues: {
      pet_allowed: false,
    },
  });

  const mutation = useMutation(uploadRoom, {
    onSuccess: (data) => {
      console.log(data);
      toast({
        status: 'success',
        title: 'Room created',
        position: 'bottom-right',
      });
      navigate('/', { replace: true });
    },
  });

  const onValid = () => {
    mutation.mutate({ ...getValues() });
  };

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery<
    ICategory[]
  >(['categories'], getCategories);
  const { data: amenitiesData, isLoading: amenitiesLoading } = useQuery<
    IAmenity[]
  >(['amenities'], getAmenities);

  return (
    <ProtectedPage>
      <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
        <Container>
          <Heading textAlign={'center'}>Upload Room</Heading>
          <VStack spacing={8} as='form' mt={5} onSubmit={handleSubmit(onValid)}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input {...register('name', { required: true })} />
              <FormHelperText>Write the name of your room </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input {...register('country', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input {...register('city', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input {...register('address', { required: true })} />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaDollarSign />} />
                <Input
                  {...register('price', { required: true, min: 0 })}
                  type={'number'}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register('rooms', { required: true, min: 0 })}
                  type={'number'}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register('toilets', { required: true, min: 0 })}
                  type={'number'}
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Descriptions</FormLabel>
              <Textarea {...register('description', { required: true })} />
            </FormControl>
            <FormControl>
              <Checkbox {...register('pet_allowed')}>Pet allowed?</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of room</FormLabel>
              <Select
                {...register('kind', { required: true })}
                placeholder='Choose a kind'
              >
                <option value={'entier_place'}>Entire Place</option>
                <option value={'private_room'}>Private Room</option>
                <option value={'shared_room'}>Shared Room</option>
              </Select>
              <FormHelperText>
                What kind of room are you renting?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Skeleton isLoaded={!categoriesLoading} rounded='lg'>
                <Select
                  {...register('category', { required: true })}
                  placeholder='Choose a category'
                >
                  {categoriesData?.map(({ pk, name }) => (
                    <option key={pk} value={pk}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Skeleton>
              <FormHelperText>
                What category describes your room?
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Amenities</FormLabel>
              <Skeleton isLoaded={!amenitiesLoading} rounded={'lg'}>
                <Grid
                  templateColumns={{
                    sm: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                    xl: 'repeat(4, 1fr)',
                    '2xl': 'repeat(5, 1fr)',
                  }}
                  gap={'4'}
                >
                  {amenitiesData?.map(({ pk, name, description }) => (
                    <Box key={pk}>
                      <Checkbox
                        value={pk}
                        {...register('amenities', { required: true })}
                      >
                        {name}
                      </Checkbox>
                      <FormHelperText>{description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </Skeleton>
            </FormControl>
            {mutation.isError ? (
              <Text color={'red'}>Upload Failed.</Text>
            ) : null}
            <LightMode>
              <Button
                type='submit'
                isLoading={mutation.isLoading}
                colorScheme={'red'}
                size={'lg'}
                w='full'
              >
                Upload Room
              </Button>
            </LightMode>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}

export default UploadRoom;
