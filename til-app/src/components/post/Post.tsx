import {
  Avatar,
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  Center,
  Spacer,
  useColorModeValue,
  useDisclosure,
  useToast,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHammer, FaComment } from "react-icons/fa";
import { KeyedMutator } from "swr";

import { getUserData } from "../../hooks/user.actions";
import Comment from "../comment/Comment";
import { format } from "timeago.js";
import PostMenu from "./PostMenu";
import { User } from "../../helpers/axios";
import { useNavigate } from "react-router-dom";

export interface IPost {
  id: string;
  title: string;
  body: string;
  author: User;
  photo?: string;
  created: Date;
  updated: Date;
}

interface PropsPost {
  post: IPost;
  refresh: KeyedMutator<any>;
}

const Post = ({ post, refresh }: PropsPost) => {
  const navigate = useNavigate();
  const { user } = getUserData();

  const handleNavigateToProfile = () => {
    navigate(`/profile/${post.author.id}`);
  };

  return (
    <Center py={4}>
      <Box
        maxW={"xl"}
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

<Box sx={{ display: "flex", justifyContent: "center", p: 2, borderRadius: "20px"  }}>

	{post.photo && <Image width={"100%"} height={"100%"} src={post.photo} />}
</Box>
	  <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar 
            src={post.author.avatar}
            onClick={handleNavigateToProfile}
            cursor={"pointer"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{post.author.username}</Text>
            <Text color={"gray.500"}>{format(post.created)}</Text>
          </Stack>
        </Stack>
        <Stack mt={4} direction={"row"} spacing={4}>
          <Comment currentPost={post} refresh={refresh} />
        </Stack>
      </Box>
    </Center>
  );
};

export default Post;
