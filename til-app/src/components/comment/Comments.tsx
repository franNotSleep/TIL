import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
  Spacer,
} from "@chakra-ui/react";

import { IComment } from "./Comment";
import { format } from "timeago.js";
import CommentMenu from "./CommentMenu";
import { IPost } from "../post/Post";
import { KeyedMutator } from "swr";
import { getUserData } from "../../hooks/user.actions";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import axiosService from "../../helpers/axios";

interface CommentsProps {
  comments: IComment[] | undefined;
  currentPost: IPost;
  refresh: KeyedMutator<any>;
}

const Comments = ({ comments, currentPost, refresh }: CommentsProps) => {
  const [edit, setEdit] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");
  const { user } = getUserData();

  const editHandler = (commentID: string) => {
    setLoading(true);
    let data = {
      author: user.id,
      body,
      post: currentPost.id,
    };

    axiosService
      .put(`post/${currentPost.id}/comment/${commentID}/`, data)
      .then((res) => {
        // success update toast
        toast({
          title: "Updated",
          description: "Update comment successfully",
          status: "success",
          duration: 2000,
        });
        setLoading(false);
        refresh();
        setEdit(false);
      })
      .catch((err) => {
        // error toast
        toast({
          title: "Error",
          description: "Error updating comment",
          status: "error",
          duration: 2000,
        });
        setLoading(false);
        setEdit(false);
      });
  };
  return (
    <Box py={6} mb={5} maxH={"350"} overflow={"auto"}>
      {comments?.length == 0 ? (
        <Text color={"gray.500"}>No Comments.</Text>
      ) : (
        comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            refresh={refresh}
            comment={comment}
            currentPost={currentPost}
          />
        ))
      )}
    </Box>
  );
};

interface CommentItemProps {
  comment: IComment;
  refresh: KeyedMutator<any>;
  currentPost: IPost;
}

const CommentItem = ({ comment, refresh, currentPost }: CommentItemProps) => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");
  const { user } = getUserData();
  const toast = useToast();

  const editHandler = (commentID: string) => {
    setLoading(true);
    let data = {
      author: user.id,
      body,
      post: comment.post,
    };

    axiosService
      .put(`post/${comment.post}/comment/${commentID}/`, data)
      .then((res) => {
        // success update toast
        toast({
          title: "Updated",
          description: "Update comment successfully",
          status: "success",
          duration: 2000,
        });
        setLoading(false);
        setEdit(false);
        refresh();
      })
      .catch((err) => {
        // error toast
        toast({
          title: "Error",
          description: "Error updating comment",
          status: "error",
          duration: 2000,
        });
        setLoading(false);
      });
  };

  return (
    <Box
      maxW={"100%"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
      key={comment.id}
      mb={2}
    >
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        <Avatar src={comment.author.avatar} />
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontWeight={600}>{comment.author.username}</Text>
          <Text color={"gray.500"}>{format(comment.updated)}</Text>
        </Stack>
        <Spacer />
        {user.id == comment.author.id && (
          <CommentMenu
            comment={comment}
            currentPost={currentPost}
            refresh={refresh}
            setEdit={setEdit}
          />
        )}
      </Stack>
      <Stack align={"center"}>
        {edit ? (
          <InputGroup w={"100"} p={2}>
            <Input
              placeholder="Add a comment..."
              _placeholder={{ bgColor: "500.gray" }}
              borderRadius={"full"}
              defaultValue={comment.body}
              onChange={(e) => setBody(e.target.value)}
            />
            <InputRightElement width="5rem">
              <Button
                fontSize={"sm"}
                rounded={"full"}
                bg={"green.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "green.500",
                }}
                _focus={{
                  bg: "green.500",
                }}
                isLoading={loading}
                loadingText="updating"
                onClick={() => editHandler(comment.id)}
              >
                Save
              </Button>
            </InputRightElement>
          </InputGroup>
        ) : (
          <Text color={"gray.500"}>{comment.body}</Text>
        )}
      </Stack>
    </Box>
  );
};
export default Comments;
