# Airbnb with Django and React

| 프로젝트 기간 | 22.09.03 ~                            |
| ------------- | ------------------------------------- |
| 프로젝트 목적 | Django & React                        |
| Github        | ‣                                     |
| Docs          | https://docs.djangoproject.com/en/4.1 |

---

## React-Router-Dom

### Basic

```
├── components
│   └── Root.tsx
├── index.tsx
├── react-app-env.d.ts
├── router.tsx
└── routes
    ├── Home.tsx
    └── Users.tsx
```

index.tsx

```tsx
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
```

router.tsx

```tsx
import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import Users from './routes/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home /> },
      { path: 'users', element: <Users /> },
    ],
  },
]);

export default router;
```

root.tsx

```tsx
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      Root
      <Outlet />
    </div>
  );
}

export default Root;
```

### Not Found (404)

```tsx
import { createBrowserRouter } from 'react-router-dom';
import Root from 'components/Root';
import Home from 'routes/Home';
import NotFound from 'routes/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [{ path: '', element: <Home /> }],
  },
]);

export default router;
```

```
├── components
│   └── Root.tsx
├── index.tsx
├── react-app-env.d.ts
├── router.tsx
└── routes
    ├── Home.tsx
    └── Users.tsx
```

index.tsx

```tsx
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
```

router.tsx

```tsx
import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import Users from './routes/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <Home /> },
      { path: 'users', element: <Users /> },
    ],
  },
]);

export default router;
```

root.tsx

```tsx
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      Root
      <Outlet />
    </div>
  );
}

export default Root;
```

---

## Chakra ui

```tsx
import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <VStack
      spacing={5}
      bg='yellow.100'
      justifyContent={'center'}
      minH={'100vh'}
    >
      <Heading>Page not found.</Heading>
      <Text>It seems that you're lost.</Text>
      <Link to='/' replace>
        <Button variant={'link'} colorScheme={'cyan'}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}

export default NotFound;
```

`npm install react-icons --save`

### Header

```tsx
import { Box, Button, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { FaAirbnb } from 'react-icons/fa';
function Root() {
  return (
    <Box>
      <HStack
        justifyContent={'space-between'}
        px={10}
        py={5}
        borderBottomWidth={1}
      >
        <Box color={'red.500'}>
          <FaAirbnb size={48} />
        </Box>
        <HStack spacing={2}>
          <Button>Log in</Button>
          <Button colorScheme={'red'}>Sign up</Button>
        </HStack>
      </HStack>
      <Outlet />
    </Box>
  );
}

export default Root;
```

### Modal

```tsx
<Modal motionPreset='slideInBottom' onClose={onClose} isOpen={isOpen}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Log in</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <VStack>
        <InputGroup>
          <InputLeftAddon
            bg={'gray.200'}
            children={
              <Box color={'gray.500'}>
                <FaUserNinja />
              </Box>
            }
          />
          <Input
            focusBorderColor={'none'}
            variant={'outline'}
            placeholder='Username'
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon
            bg={'gray.200'}
            children={
              <Box color={'gray.500'}>
                <FaLock />
              </Box>
            }
          />
          <Input
            focusBorderColor={'none'}
            variant={'outline'}
            placeholder='Password'
          />
        </InputGroup>
      </VStack>
    </ModalBody>
    <ModalFooter>
      <Button w={'100%'} colorScheme='red'>
        Log in
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Theme

[docs](https://chakra-ui.com/docs/styled-system/customize-theme#customizing-theme-tokens)

theme.ts → extends default theme

```tsx
import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
```

index.tsx

ColorModeScript를 통해 theme을 우선 결정

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import router from 'router';
import theme from 'theme';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
```

### hooks

useColorMode

useColorModeValue

```tsx
const { toggleColorMode } = useColorMode();
// useColorModeValue(Ligth, Dark)
const logoColor = useColorModeValue('red.500', 'red.200');
const Icon = useColorModeValue(FaMoon, FaSun);

return (
  <HStack justifyContent={'space-between'} px={10} py={5} borderBottomWidth={1}>
    <Box color={logoColor}>
      <FaAirbnb size={48} />
    </Box>
    <HStack spacing={2}>
      <IconButton
        onClick={toggleColorMode}
        aria-label='toggle dark mode'
        icon={<Icon />}
        variant={'ghost'}
      />
      <Button onClick={onLoginOpen}>Log in</Button>
      {/* Force color */}
      <LightMode>
        <Button onClick={onSignupOpen} colorScheme={'red'}>
          Sign up
        </Button>
      </LightMode>
    </HStack>
    <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
    <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
  </HStack>
);
```

### Grid

```tsx
import { FaRegHeart, FaStar } from 'react-icons/fa';
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

function Home() {
  return (
    <Grid
      mt={10}
      px={40}
      columnGap={4}
      rowGap={8}
      templateColumns={'repeat(5, 1fr)'}
    >
      <VStack alignItems={'flex-start'}>
        <Box position={'relative'} overflow={'hidden'} mb={3} rounded='3xl'>
          <Image
            h='280'
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
          <Text fontSize={'sm'} color='gray.600'>
            Seoul, S. Korea
          </Text>
        </Box>
        <Text fontSize={'sm'} color='gray.600'>
          <Text as='b'>$72</Text> / night
        </Text>
      </VStack>
    </Grid>
  );
}

export default Home;
```

### Responsive Design

default

```tsx
const breakpoints = {
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};
```

```tsx
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
```

### Skeleton

```tsx
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
```

### **Pseudo** Selector

[docs](https://chakra-ui.com/docs/styled-system/style-props#pseudo)

\_hover, \_active …

```tsx
<Button
  variant={'unstyled'}
  position={'absolute'}
  size='25px'
  right={5}
  top={5}
  color='white'
  _hover={{
    color: 'red',
  }}
>
  <FaRegHeart size={'25px'} />
</Button>
```

## React Query

`npm i @tanstack/react-query`

index.tsx

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import router from 'router';
import theme from 'theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```

Home.tsx

key, fetcher function

```tsx
const { data: rooms, isLoading } = useQuery<IRoom[]>(['rooms'], getRooms);
```

## Axios

`npm i axios`

api.ts

```tsx
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
});

export const getRooms = () =>
  axiosInstance.get('rooms/').then((response) => response.data);
```
