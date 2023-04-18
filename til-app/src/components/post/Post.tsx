import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  HStack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaComment, FaHammer } from "react-icons/fa";

import { User } from "../../helpers/axios";

export interface IPost {
  id: string;
  title: string;
  body: string;
  author: User;
}

interface PropsPost {
  post: IPost;
}

const Post = ({ post }: PropsPost) => {
  return (
    <Card borderTop="8px" m="auto" borderColor="gray.400" maxW="lg" mb={10}>
      <CardHeader>
        <Flex gap={5} alignItems="center">
          <Avatar />
          <Box>
            <HStack>
              <Text bg={"gray.100"}>Today I Learned About: </Text>
              <Text>{post.title}</Text>
            </HStack>
            <Text>By {post.author.username}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Center>
          <Text>{post.body}</Text>
        </Center>
      </CardBody>
      <Divider color="gray.200" />
      <CardFooter>
        <Button leftIcon={<FaHammer />} variant="ghost">
          Reinforce 0
        </Button>
        <Spacer />
        <Button leftIcon={<FaComment />} variant="ghost">
          Comment 0
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
