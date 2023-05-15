import { ViewIcon } from "@chakra-ui/icons";
import { 
  Avatar,
  Box,
  Divider,
  Flex,
  Text,
  Button, 
  HStack,
  VStack} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

import { fetcher, User } from "../../helpers/axios";

const ProfileList = () => {
  const users = useSWR("/user", fetcher);

  return (
    <Box
      display={{ base: "none", lg: "flex" }}
      height="600px"
      overflowY={"auto"}
      my={5}
      w={300}
      flexDirection={"column"}
      borderRadius={"md"}
      p={5}
      borderWidth={"1px"}
    >
      {users.data?.results.map((user: User) => (
        <>
          <ProfileItem user={user} key={user.id} />
        </>
      ))}
    </Box>
  );
};

interface PropsProfileItem {
  user: User;
}
const ProfileItem = ({ user }: PropsProfileItem) => {
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate(`/profile/${user.id}`);
  };
  return (
    <Box 
      mb={3}
      w={"100%"}
      borderTopWidth={4}
      borderTopRadius={"md"}
      borderTopColor={"gray.200"}>

      <HStack justifyContent={"space-around"}>
        <Avatar src={user.avatar}/>
        <Box>
          <Text textAlign={'left'}>{user.username}</Text>
          <Button 
            w={150} 
            leftIcon={<ViewIcon />}
            onClick={handleNavigateToProfile}>View</Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default ProfileList;
