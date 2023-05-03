import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  keyframes,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';

import { User } from '../../helpers/axios';

interface ProfileCardProps {
  user: User;
}
const ProfileCard = ({ user }: ProfileCardProps) => {

  const KorM = (n: number) => {
    if (n >= 1000000) {
        return n + "m"
    }
    else if (n > 999) {
        return n + "k"
    } 
    return n;
  }

  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={user.avatar}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {user.first_name}
            </Heading>
            <Text color={'gray.500'}>{user.email}</Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{KorM(user.posts_count)}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Posts 
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{KorM(user.reinforces_count)}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Reinforces 
              </Text>
            </Stack>
          </Stack>

          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            leftIcon={<FaEdit />}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            Edit 
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default ProfileCard;
