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
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

import { User } from "../../helpers/axios";
import { getUserData } from "../../hooks/user.actions";
import ProfileEdit from "./ProfileEdit";

interface ProfileCardProps {
  userProfile: User;
}
const ProfileCard = ({ userProfile }: ProfileCardProps) => {
  const { user } = getUserData();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const KorM = (n: number) => {
    if (n >= 1000000) {
      return n + "m";
    } else if (n > 999) {
      return n + "k";
    }
    return n;
  };

  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={userProfile.avatar}
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={userProfile.avatar}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {userProfile.username}
            </Heading>
            <Text color={"gray.500"}>{userProfile.email}</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{KorM(userProfile.posts_count)}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Posts
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{KorM(userProfile.comments_count)}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Comments
              </Text>
            </Stack>
          </Stack>

          {user.id == userProfile.id && (
            <Button
              w={"full"}
              mt={8}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              onClick={onOpen}
              leftIcon={<FaEdit />}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Edit
            </Button>
          )}
        </Box>
      </Box>
      {/*Render Profile Edit*/}
      <ProfileEdit isOpen={isOpen} onClose={onClose} />
    </Center>
  );
};

export default ProfileCard;
