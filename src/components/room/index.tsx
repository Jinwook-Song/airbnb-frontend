import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { FaCamera, FaRegHeart, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

interface IRoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  is_owner: boolean;
}

function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  is_owner,
}: IRoomProps) {
  const gray = useColorModeValue('gray.600', 'gray.300');
  const navigate = useNavigate();
  function handlePhotoUpload(event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  }
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={'flex-start'}>
        <Box position='relative' overflow={'hidden'} mb={3} rounded='2xl'>
          <Image minH='280' src={imageUrl} />
          <Button
            variant={'unstyled'}
            position='absolute'
            top={0}
            right={0}
            color='white'
            onClick={handlePhotoUpload}
          >
            {is_owner ? <FaCamera size={'20px'} /> : <FaRegHeart size='20px' />}
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={'6fr 1fr'}>
            <Text display={'block'} as='b' noOfLines={1} fontSize='md'>
              {name}
            </Text>

            <HStack spacing={1} alignItems='center'>
              <FaStar size={12} />
              <Text fontSize={'sm'}>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={'sm'} color={gray}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize={'sm'} color={gray}>
          <Text as='b'>${price}</Text> / night
        </Text>
      </VStack>
    </Link>
  );
}

export default Room;
