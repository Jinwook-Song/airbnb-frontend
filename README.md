# Airbnb with Django and React

| 프로젝트 기간 | 22.09.03 ~ 22.11.27                   |
| ------------- | ------------------------------------- |
| 프로젝트 목적 | Django & React                        |
| Github        | ‣‣                                    |
| Docs          | https://docs.djangoproject.com/en/4.1 |
| Homepage      | https://airbnbv1.xyz/                 |

---

### Authentication (TODOS)

- [ ] Sign up
- [ ] Refactor Kakao Login
- [ ] Refactor Github Login

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

## with Variables

RoomDetail.tsx

```tsx
const { data } = useQuery(['roomId:', roomPk], getRoom);
```

api.ts

useQuery의 key를 받아서 사용할 수 있음

```tsx
import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
});

export const getRooms = () =>
  axiosInstance.get('rooms/').then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) =>
  axiosInstance.get(`rooms/${queryKey[1]}`).then((response) => response.data);
```

## Chakra Ui

grid template with skeleton

```tsx
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
```

### Avatar

```tsx
<Avatar name={data?.owner.username} size={'lg'} src={data?.owner.avatar}>
  <AvatarBadge boxSize={'50%'} bg='green' />
</Avatar>
```

## Authentication

useUser.ts

```tsx
import { useQuery } from '@tanstack/react-query';
import { getMe } from 'lib/api';

export default function useUser() {
  const {
    data,
    isLoading: userLoading,
    isError,
  } = useQuery(['me'], getMe, {
    retry: false,
  });
  return {
    userLoading,
    isLoggedIn: !isError,
    user: data,
  };
}
```

### Session authentication with Cookies

- Server → Client
  Log in → Django create session object (session db) → Django give cookie with session id to the user
- Client → Server
  Browser send the cookie automatically → Django can identify user with the session Id inside of cookie
- Which cookies does the browser send to the server?
  Browser knows which domain generated the cookie.
- But javascript fetch have to send cookie manually
  frontend > api.ts

  ```tsx
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    withCredentials: true, // API 요청시 쿠키를 보냄
  });
  ```

  backend > config > setting.py

  ```python
  CORS_ALLOWED_ORIGINS = [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
  ]

  CORS_ALLOW_CREDENTIALS = True
  ```

### Menu (ui)

```tsx
<Menu>
  <MenuButton>
    <Avatar name={user?.username} src={user?.avatar} size={'md'} />
  </MenuButton>
  <MenuList>
    <MenuItem onClick={handleLogOut}>Log out</MenuItem>
  </MenuList>
</Menu>
```

### Toast

```tsx
const toast = useToast();

async function handleLogOut() {
  const toastId = toast({
    title: 'Login out..',
    description: 'Sad to see you go...',
    status: 'loading',
    position: 'bottom-right',
    isClosable: true,
  });
  // const response = await logOut();
  // console.log(response);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  toast.update(toastId, {
    title: 'Done!',
    description: 'See you later!',
    status: 'success',
    duration: 1000,
  });
}
```

### CSRF(Cross-site request forgery)

- Django는 기본적으로 post 요청을 신뢰하지 않음
- cors와 마찬가지로 허용해주어야 한다

Backend > config > settings.py

```python
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

- front에서도 요청시 header에 csfr token이 있어야 한다

Frontend > api.ts

`npm i js-cookie`

```tsx
import Cookie from 'js-cookie';

export const logOut = () =>
  axiosInstance
    .post('users/log-out', null, {
      headers: {
        'X-CSRFToken': Cookie.get('csrftoken') || '',
      },
    })
    .then((response) => response.data);
```

- Logout 이후, 상태를 업데이트 하기 위해 refetch

```tsx
import { useQueryClient } from '@tanstack/react-query';
const queryClient = useQueryClient();

await logOut();
queryClient.refetchQueries(['me']);
```

## OAuth (github, kakao, …)

Basic Flow

1. user → github
2. if permission confirm ? github → redirect with token (127.0.0.1:3000/confirm-gh?token=123asd)
3. send token to backend(django)
4. backend can use github-api with that token

api.ts

```tsx
export const githubLogIn = (code: string) =>
  axiosInstance
    .post(
      `/users/github`,
      { code },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);
```

new URLSearchParams

```tsx
import {
  Heading,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { githubLogIn } from 'lib/api';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      const status = await githubLogIn(code);
      switch (status) {
        case 200:
          toast({
            status: 'success',
            title: 'Welcome!',
            position: 'bottom-right',
            description: 'Happy to have you back!',
          });
          queryClient.refetchQueries(['me']);
          navigate('/');
          break;
        case 201:
          toast({
            status: 'success',
            title: 'Welcome!',
            position: 'bottom-right',
            description: 'Glad you join us',
          });
          queryClient.refetchQueries(['me']);
          navigate('/');
          break;
        case 400:
          break;
      }
    }
  };
  useEffect(() => {
    confirmLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gray = useColorModeValue('gray.100', 'gray.800');
  return (
    <VStack spacing={5} bg={gray} justifyContent={'center'} minH={'100vh'}>
      <Heading size={'lg'}>Processing log in...</Heading>
      <Text>Please wait for a moment</Text>
      <Spinner size={'lg'} />
    </VStack>
  );
}

export default GithubConfirm;
```

```tsx
import { Box, Button, Divider, HStack, Text } from '@chakra-ui/react';
import { FaComment, FaGithub } from 'react-icons/fa';

function SocialLogin() {
  const githubParams = {
    client_id: '20d8b08eabc2559afc43',
    scope: 'read:user,user:email',
  };
  const kakaoParams = {
    client_id: 'c503f1bf93ea8c9971ff490a57332257',
    redirect_uri: 'http://127.0.0.1:3000/social/kakao',
    response_type: 'code',
  };
  const githubParamsURL = new URLSearchParams(githubParams).toString();
  const kakaoParamsURL = new URLSearchParams(kakaoParams).toString();

  return (
    <Box mb={4}>
      <HStack my={4}>
        <Divider />
        <Text
          textTransform={'uppercase'}
          color='gray.500'
          fontSize={'xs'}
          as='b'
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <HStack>
        <Button
          as={'a'}
          href={`https://github.com/login/oauth/authorize?${githubParamsURL}`}
          leftIcon={<FaGithub />}
          w='full'
          colorScheme={'gray'}
        >
          Continue with Github
        </Button>
        <Button
          as={'a'}
          href={`https://kauth.kakao.com/oauth/authorize?${kakaoParamsURL}`}
          leftIcon={<FaComment />}
          w='full'
          colorScheme={'yellow'}
        >
          Continue with Kakao
        </Button>
      </HStack>
    </Box>
  );
}

export default SocialLogin;
```

### useMutation

[docs](https://tanstack.com/query/v4/docs/reference/useMutation)

api.ts

```tsx
export interface LoginFormProps {
  username: string;
  password: string;
}

export interface LoginSuccessResponse {
  ok: string;
}
export interface LoginFailResponse {
  error: string;
}

export const manualLogin = ({ username, password }: LoginFormProps) =>
  axiosInstance
    .post(
      `/users/log-in`,
      { username, password },
      {
        headers: {
          'X-CSRFToken': Cookie.get('csrftoken') || '',
        },
      }
    )
    .then((response) => response.status);
```

login.tsx

useMutation은 success, fail, props 의 세 타입을 받는다

```tsx
const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(manualLogin, {
    onMutate: () => {
      console.log('mutation starting');
    },
    onSuccess: (data) => {
      console.log('✅', data);
      toast({
        status: 'success',
        title: 'Welcome!',
        position: 'bottom-right',
        description: 'Happy to have you back!',
      });
      onClose();
      queryClient.refetchQueries(['me']);
    },
    onError: (error) => {
      console.log('mutation has an error');
    },
  });

  function onValid() {
    mutation.mutate({ ...getValues() });
```

### Protected Page (component or hook)

- component

```tsx
import useUser from 'lib/hooks/useUser';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProtectedPageProps {
  children: React.ReactNode;
}

function ProtectedPage({ children }: IProtectedPageProps) {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate('/', { replace: true });
      }
    }
  }, [navigate, userLoading, isLoggedIn]);
  return <>{children}</>;
}

export default ProtectedPage;
```

- hook

```tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from './useUser';

function useHostOnly() {
  const { user, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!user?.is_host) {
        navigate('/', { replace: true });
      }
    }
  }, [navigate, userLoading, user]);
  return;
}

export default useHostOnly;
```

- usage

```tsx
import ProtectedPage from 'components/middleware/ProtectedPage';
import useHostOnly from 'lib/hooks/useHostOnly';

function UploadRoom() {
  useHostOnly();
  return <ProtectedPage>UploadRoom</ProtectedPage>;
}

export default UploadRoom;
```

## CloudFlare

Front → Backend → Storage (like AWS) X

Front request URL to backend

Bakcend give empty URL from CF

Front directly upload image on the URL

## Calendar

`npm i react-calendar`

props가 직관적이라 그대로 이해할 수 있음

[docs](https://www.npmjs.com/package/react-calendar)

```tsx
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default css

const [dates, setDates] = useState<Date>();

<Calendar
  onChange={setDates}
  locale='en-US'
  minDate={new Date()}
  maxDate={new Date(Date.now() + 60 * 60 * 24 * 60 * 1000)}
  minDetail='month'
  prev2Label={null}
  next2Label={null}
  selectRange
/>;
```

```tsx
const [dates, setDates] = useState<Date[]>();
const { data: checkBookingData, isLoading: checkBookingLoading } = useQuery(
  ['check', roomPk, dates],
  checkBooking,
  {
    cacheTime: 0, // 가장 최신의 결과르 받기위해
    enabled: dates !== undefined, // dates 없는 경우 query 실행 방지
  }
);
```

# Deploy

- Render

  - [docs](https://render.com/docs/deploy-django#go-production-ready)
  - debug mode에 따른 백엔드 설정 cors, csrf 등
  - render.yaml

    ```yaml
    databases:
      - name: airbnb-db
        databaseName: airbnb-db
        user: airbnb-db
        region: singapore

    services:
      - type: web
        name: airbnb-backend
        env: python
        region: singapore
        buildCommand: './build.sh'
        startCommand: 'gunicorn config.wsgi:application'
        envVars:
          - key: DATABASE_URL
            fromDatabase:
              name: airbnb-db
              property: connectionString
          - key: SECRET_KEY
            generateValue: true
          - key: WEB_CONCURRENCY
    	        value: 4
    ```

  - build.sh

    ```bash
    #!/usr/bin/env bash
    # exit on error
    set -o errexit

    pip install --upgrade pip
    poetry install
    pip install --force-reinstall -U setuptools
    python manage.py collectstatic --no-input
    python manage.py migrate
    ```

- Sentry
  - 에러가 발생했을때 알림 설정 (djaongo뿐 아니라 다양한 서비스에 적용 가능
- Domain(namecheap)
  - 백엔드와 프론트의 도메인이 달라 쿠키 설정 등 문제가 발생
  - 도메인을 구입하여 custom 도메인을 설정
