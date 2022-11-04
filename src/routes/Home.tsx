import { Grid } from '@chakra-ui/react';
import Room from 'components/room';
import RoomSkeleton from 'components/room/RoomSkeleton';
import { useEffect, useState } from 'react';

interface IPhoto {
  pk: string;
  file: string;
  description: string;
}

interface IRoom {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IPhoto[];
}

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState<IRoom[]>([]);

  async function fetchRooms() {
    const response = await fetch('http://127.0.0.1:8000/api/v1/rooms/');
    const json = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setRooms(json);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchRooms();
  }, []);

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
        : rooms.map((room, idx) => (
            <Room
              key={idx}
              imageUrl={
                room.photos[0]?.file ??
                `https://source.unsplash.com/random/450x${450 + idx}`
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
