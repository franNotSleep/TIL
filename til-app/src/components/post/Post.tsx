import { EditIcon } from "@chakra-ui/icons";
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
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaComment, FaHammer } from "react-icons/fa";
import { KeyedMutator } from "swr";

import axiosService, { User } from "../../helpers/axios";
import { getUserData } from "../../hooks/user.actions";
import EditPost from "./EditPost";

export interface IPost {
  id: string;
  title: string;
  body: string;
  author: User;
}

interface PropsPost {
  post: IPost;
  refresh: KeyedMutator<any>;
}

const Post = ({ post, refresh }: PropsPost) => {
  const { user } = getUserData();
  return (
    <Card borderTop="8px" m="auto" borderColor="gray.400" maxW="3xl" mb={10}>
      <CardHeader>
        <Flex gap={5} alignItems="center">
          <Avatar />

          <Box>
            <Text>{post.title}</Text>
            <Text>By {post.author.username}</Text>
          </Box>

          <Spacer />

          {user.id == post.author.id && (
            <PostMenu post={post} refresh={refresh} />
          )}
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

interface PostMenuProps {
  post: IPost;
  refresh: KeyedMutator<any>;
}

const PostMenu = ({ post, refresh }: PostMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onDelete = () => {
    axiosService
      .delete("/post/" + post.id)
      .then((res) => {
        toast({
          title: "Post deleted",
          description: "Post deleted successfully",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
          icon: <AiOutlineDelete />,
        });
        refresh();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message || "Error deleting post",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BsThreeDotsVertical />}
        aria-label="Options"
        variant="outline"
      />

      <MenuList>
        <MenuItem onClick={onOpen} icon={<EditIcon color="blue" />}>
          Edit
        </MenuItem>
        <MenuItem onClick={onDelete} icon={<AiOutlineDelete color="red" />}>
          Delete
        </MenuItem>
      </MenuList>

      {/* Render edit component */}
      <EditPost
        isOpen={isOpen}
        onClose={onClose}
        post={post}
        refresh={refresh}
      />
    </Menu>
  );
};

export default Post;
