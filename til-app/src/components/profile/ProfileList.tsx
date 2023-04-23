import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

import { fetcher, User } from "../../helpers/axios";

const ProfileList = () => {
  const users = useSWR("/user", fetcher);

  return (
    <Box
      display={{ base: "none", lg: "flex" }}
      height="500px"
      my={5}
      flexDirection={"column"}
      borderRadius={"md"}
      p={5}
      maxW={"md"}
      borderWidth={"1px"}
    >
      {users.data?.results.map((user: User) => (
        <>
          <ProfileItem user={user} key={user.id} />
          <Divider mb={5} />
        </>
      ))}
    </Box>
  );
};

interface PropsProfileItem {
  user: User;
}
const ProfileItem = ({ user }: PropsProfileItem) => {
  return (
    <Flex
      justifyContent={"flex-start"}
      borderBottomColor={"gray.500"}
      borderBottomWidth={"2px"}
      borderRadius={"full"}
      borderWidth={"2px"}
      overflow={"hidden"}
    >
      <Avatar />
      <Box ml={1}>
        <Text>{user.username}</Text>
        <Text color={"CaptionText"}>{user.email}</Text>
      </Box>
    </Flex>
  );
};

export default ProfileList;
