import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRoom } from 'util/api';
import { IRoomDetail } from 'types';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
} from '@chakra-ui/react';

function RoomDetail() {
  const { roomPk } = useParams();

  const { data, isLoading } = useQuery<IRoomDetail>(
    ['roomId:', roomPk],
    getRoom
  );

  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton isLoaded={!isLoading} height={'44px'} width={'50%'}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        gap={3}
        rounded={'lg'}
        overflow='hidden'
        height={'60vh'}
        templateRows={'1fr 1fr'}
        templateColumns={'repeat(4, 1fr)'}
      >
        {new Array(5).fill(0).map((_, idx) => (
          <GridItem
            colSpan={idx === 0 ? 2 : 1}
            rowSpan={idx === 0 ? 2 : 1}
            overflow={'hidden'}
            key={idx}
          >
            <Skeleton isLoaded={!isLoading} w='100%' h='100%'>
              <Image
                src={data?.photos[idx].file}
                w='100%'
                h='100%'
                objectFit={'cover'}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default RoomDetail;
