import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
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
    >
      {users.data?.results.map((user: User) => (
        <ProfileItem user={user} key={user.id} />
      ))}
    </Box>
  );
};

interface PropsProfileItem {
  user: User;
}
const ProfileItem = ({ user }: PropsProfileItem) => {
  return (
    <Flex justifyContent={"space-around"} mb={5}>
      <HStack gap={2}>
        <Avatar />
        <Box>
          <Text>{user.username}</Text>
          <Text color="gray.200">{user.email}</Text>
        </Box>
      </HStack>
    </Flex>
  );
};

export default ProfileList;
