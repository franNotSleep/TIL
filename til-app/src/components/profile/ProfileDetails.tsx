import { Avatar, Box, Center, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

import { User } from "../../helpers/axios";

interface PropsProfileDetails {
  user: User;
}

const ProfileDetails = ({ user }: PropsProfileDetails) => {
  return (
    <Box p={4}>
      <Flex flexDirection={"column"}>
        <Center>
          <VStack>
            <Avatar size="xl" />

            <Box textAlign={"center"}>
              <Text>{user.username}</Text>
              <Text>{user.email}</Text>
            </Box>
          </VStack>
        </Center>
      </Flex>
    </Box>
  );
};

export default ProfileDetails;
