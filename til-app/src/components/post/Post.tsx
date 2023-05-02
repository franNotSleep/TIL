import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHammer, FaComment } from "react-icons/fa";
import { KeyedMutator } from "swr";

import axiosService, { User } from "../../helpers/axios";
import { getUserData } from "../../hooks/user.actions";
import Comment from "../comment/Comment";
import EditPost from "./EditPost";
import { format } from "timeago.js";
import PostMenu from "./PostMenu";
import Reinforce from "../reinforce/Reinforce";

export interface IPost {
  id: string;
  title: string;
  body: string;
  author: User;
  created: Date;
  updated: Date;
}

interface PropsPost {
  post: IPost;
  refresh: KeyedMutator<any>;
}

const Post = ({ post, refresh }: PropsPost) => {
  const { user } = getUserData();
    return (
    <Center py={6}>
      <Box
        maxW={"4xl"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack>
          <HStack>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              I learned
            </Text>

            <Spacer />

            {user.id == post.author.id && (
              <PostMenu post={post} refresh={refresh} />
            )}
          </HStack>

          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {post.title}
          </Heading>
          <Text color={"gray.500"}>{post.body}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{post.author.username}</Text>
            <Text color={"gray.500"}>{format(post.created)}</Text>
          </Stack>
        </Stack>
        <Stack mt={8} direction={"row"} spacing={4}>
          <Reinforce currentPost={post} refresh={refresh} />
          <Comment currentPost={post} refresh={refresh} />
        </Stack>
      </Box>
    </Center>
  );
};

export default Post;
