import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Highlight,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { KeyedMutator } from "swr";
import { format } from "timeago.js";

import { User } from "../../helpers/axios";
import Post, { IPost } from "../post/Post";

interface PropsProfileTab {
  userPosts: {
    results: IPost[];
    next: string | null;
    previous: string | null;
  };
  refresh: KeyedMutator<any>;
  user: User;
}

const ProfileTab = ({ userPosts, refresh, user }: PropsProfileTab) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Posts</Tab>
        <Tab>
          <Highlight
            query="me"
            styles={{
              fontWeight: "bold",
              color: "white",
              bg: "blue.500",
              textTransform: "uppercase",
              borderRadius: "md",
              ml: "1px",
            }}
          >
            About me
          </Highlight>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          {/* POSTS PANEL */}
          {userPosts.results.length === 0 ? (
            <Text>No posts yet.</Text>
          ) : (
            userPosts.results.map((post) => (
              <Post post={post} key={post.id} refresh={refresh} />
            ))
          )}
        </TabPanel>
        <TabPanel>
          {/* About Me */}
          <Center>
            <Card w="xl">
              <CardHeader>
                <Center>
                  <VStack>
                    <Avatar />

                    <Text>
                      {user.first_name} {user.last_name}
                    </Text>
                  </VStack>
                </Center>
              </CardHeader>

              <CardBody>
                <Center>
                  <Text
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      mb: "2px",
                      bg: "green.500",
                      borderRadius: "md",
                      mr: "2px",
                    }}
                  >
                    BIO:{" "}
                  </Text>
                  <Text>{user.bio}</Text>
                </Center>
              </CardBody>
              <CardFooter
                display="flex"
                flexDir={{ base: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <HStack>
                  <Text
                    sx={{
                      fontWeight: "bold",
                      color: "green.500",
                    }}
                  >
                    Joined:{" "}
                  </Text>
                  <Text
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      bg: "green.500",
                      textTransform: "uppercase",
                      borderRadius: "md",
                      ml: "1px",
                    }}
                  >
                    {format(user.created)}
                  </Text>
                </HStack>
                <HStack>
                  <Text
                    sx={{
                      fontWeight: "bold",
                      color: "blue.500",
                    }}
                  >
                    Updated:{" "}
                  </Text>
                  <Text
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      bg: "blue.500",
                      textTransform: "uppercase",
                      borderRadius: "md",
                      ml: "1px",
                    }}
                  >
                    {format(user.updated)}
                  </Text>
                </HStack>
              </CardFooter>
            </Card>
          </Center>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTab;
