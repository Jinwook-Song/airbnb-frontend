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
