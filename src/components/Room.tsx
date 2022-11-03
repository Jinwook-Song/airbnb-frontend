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
import { FaRegHeart, FaStar } from 'react-icons/fa';

function Room() {
  const gray = useColorModeValue('gray.600', 'gray.300');

  return (
    <VStack alignItems={'flex-start'}>
      <Box position={'relative'} overflow={'hidden'} mb={3} rounded='3xl'>
        <Image
          minH={'280'}
          src='https://a0.muscache.com/im/pictures/miso/Hosting-47181423/original/39c9d4e7-78d0-4807-9f0d-3029d987d02a.jpeg?im_w=720'
        />
        <Button
          variant={'unstyled'}
          position={'absolute'}
          size='25px'
          right={5}
          top={5}
          color='white'
        >
          <FaRegHeart size={'25px'} />
        </Button>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={'6fr 1fr'}>
          <Text display={'block'} as='b' noOfLines={1} fontSize='md'>
            Cheomdangwahak-ro,Jeongeup-si, North Jeolla Province, South Korea
          </Text>
          <HStack spacing={1}>
            <FaStar size={15} />
            <Text>5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={'sm'} color={gray}>
          Seoul, S. Korea
        </Text>
      </Box>
      <Text fontSize={'sm'} color={gray}>
        <Text as='b'>$72</Text> / night
      </Text>
    </VStack>
  );
}

export default Room;