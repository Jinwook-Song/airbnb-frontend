import {
  Box,
  Button,
  Divider,
  HStack,
  LightMode,
  Text,
} from '@chakra-ui/react';
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
        <LightMode>
          <Button
            as={'a'}
            href={`https://kauth.kakao.com/oauth/authorize?${kakaoParamsURL}`}
            leftIcon={<FaComment />}
            w='full'
            colorScheme={'yellow'}
          >
            Continue with Kakao
          </Button>
        </LightMode>
      </HStack>
    </Box>
  );
}

export default SocialLogin;
