import { Grid } from '@chakra-ui/react';
import Room from 'components/room';
import RoomSkeleton from 'components/room/RoomSkeleton';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from 'lib/api';
import { IRoomList } from 'types';

function Home() {
  const { data: rooms, isLoading } = useQuery<IRoomList[]>(['rooms'], getRooms);

  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
        xl: 'repeat(4, 1fr)',
        '2xl': 'repeat(5, 1fr)',
      }}
    >
      {isLoading
        ? new Array(10).fill(0).map((_, idx) => <RoomSkeleton key={idx} />)
        : rooms?.map((room, idx) => (
            <Room
              key={idx}
              pk={room.pk}
              imageUrl={
                room.photos[0]?.file ??
                `https://source.unsplash.com/random/800x${800 + idx}`
              }
              name={room.name}
              rating={room.rating}
              city={room.city}
              country={room.country}
              price={room.price}
            />
          ))}
    </Grid>
  );
}

export default Home;
