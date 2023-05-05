import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useDisclosure
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';
import { getUserData, useUserActions } from '../../hooks/user.actions';
import { useRef, useState } from 'react';
import { Form } from 'react-router-dom';

 
interface ProfileEditProps {
  isOpen: boolean;
  onClose: () => void;
}
const ProfileEdit = ({ isOpen, onClose }: ProfileEditProps) => {
  const [loading, setLoading] = useState(false);
  const { updateUser } = useUserActions();
  const { user } = getUserData();
  const avatar = useRef<HTMLInputElement>(null)

  const updateProfileHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    let formData = new FormData((e.target as HTMLFormElement));

    if (avatar.current?.value == "") {
      // don't send avatar with the request
      formData.delete("avatar");
    }

    updateUser(formData, setLoading);
    onClose();
  }
  return (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalBody>
          <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
              spacing={4}
              w={'full'}
              maxW={'md'}
              bg={useColorModeValue('white', 'gray.700')}
              rounded={'xl'}
              boxShadow={'lg'}
              p={6}
              >
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                User Profile Edit
              </Heading>
              <Form onSubmit={updateProfileHandler}>
                <FormControl id="userName">
                  <FormLabel>User Icon</FormLabel>
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Avatar size="xl" src={user.avatar} />
                    </Center>
                    <Center w="full">
                      <Input 
                        ref={avatar}
                        type="file" 
                        name="avatar" 
                        accept="image/png, image/jpeg"
                      />
                    </Center>
                  </Stack>
                </FormControl>
                <FormControl id="userName">
                  <FormLabel>Username</FormLabel>
                  <Input
                     name="username"
                     defaultValue={user.username}
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                  />
                </FormControl>
                <FormControl id="email" mt={3}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    defaultValue={user.email}
                    _placeholder={{ color: 'gray.500' }}
                    type="email"
                  />
                </FormControl>
                <Stack mt={3} spacing={6} direction={['column', 'row']}>
                  <Button
                    bg={'red.400'}
                    onClick={onClose}
                    color={'white'}
                      w="full"
                    _hover={{
                      bg: 'red.500',
                    }}>
                    Cancel
                  </Button>
                  <Button
                    w="full"
                    type="submit"
                    isLoading={loading}
                    loadingText="Saving..."
                    mt={8}
                    bg={useColorModeValue('#151f21', 'gray.900')}
                    color={'white'}
                    rounded={'md'}
                    leftIcon={<FaEdit />}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}>
                    Submit
                  </Button>
                </Stack>
              </Form>
            </Stack>
          </Flex>
        </ModalBody>
    </ModalContent>
  </Modal>

  );
}

export default ProfileEdit;
