import { Box, Button, Divider, HStack, Text } from '@chakra-ui/react';
import { FaComment, FaGithub } from 'react-icons/fa';

function SocialLogin() {
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
          href='https://github.com/login/oauth/authorize?client_id=20d8b08eabc2559afc43&scope=read:user,user:email'
          leftIcon={<FaGithub />}
          w='full'
          colorScheme={'gray'}
        >
          Continue with Github
        </Button>
        <Button leftIcon={<FaComment />} w='full' colorScheme={'yellow'}>
          Continue with Kakao
        </Button>
      </HStack>
    </Box>
  );
}

export default SocialLogin;
