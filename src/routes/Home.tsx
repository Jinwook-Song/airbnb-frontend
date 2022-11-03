import { Box, Grid, Skeleton, SkeletonText } from '@chakra-ui/react';
import Room from 'components/Room';
import { useEffect, useState } from 'react';

function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
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
      {new Array(8).fill(0).map((_, idx) => (
        <Room key={idx} />
      ))}
      <Box>
        <Skeleton
          height={280}
          rounded='2xl'
          mb={6}
          isLoaded={loaded}
          fadeDuration={1}
        >
          <Room />
        </Skeleton>
        <SkeletonText noOfLines={2} spacing={3} isLoaded={loaded} mb={6} />
        <SkeletonText noOfLines={1} isLoaded={loaded} />
      </Box>
    </Grid>
  );
}

export default Home;
