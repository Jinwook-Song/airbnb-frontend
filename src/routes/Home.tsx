import { Grid } from '@chakra-ui/react';
import Room from 'components/Room';

function Home() {
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
      {new Array(20).fill(0).map((_, idx) => (
        <Room key={idx} />
      ))}
    </Grid>
  );
}

export default Home;
