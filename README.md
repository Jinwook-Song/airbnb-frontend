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
