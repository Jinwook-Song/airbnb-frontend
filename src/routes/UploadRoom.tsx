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
  Select,
  Skeleton,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import ProtectedPage from 'components/middleware/ProtectedPage';
import { getAmenities, getCategories } from 'lib/api';
import useHostOnly from 'lib/hooks/useHostOnly';
import { FaBed, FaDollarSign, FaToilet } from 'react-icons/fa';
import { IAmenity, ICategory } from 'types';

function UploadRoom() {
  useHostOnly();

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
          <VStack spacing={8} as='form' mt={5}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input />
              <FormHelperText>Write the name of your room </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaDollarSign />} />
                <Input type={'number'} min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input type={'number'} min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input type={'number'} min={0} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Descriptions</FormLabel>
              <Textarea />
            </FormControl>
            <FormControl>
              <Checkbox>Pet friendly?</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel>Kind of room</FormLabel>
              <Select placeholder='Choose a kind'>
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
                <Select placeholder='Choose a category'>
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
                      <Checkbox value={pk}>{name}</Checkbox>
                      <FormHelperText>{description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </Skeleton>
            </FormControl>
            <Button colorScheme={'red'} size={'lg'} w='full'>
              Upload Room
            </Button>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}

export default UploadRoom;
