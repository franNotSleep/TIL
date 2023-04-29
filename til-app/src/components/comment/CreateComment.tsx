import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axiosService from "../../helpers/axios";
import { IPost } from "../post/Post";
import { getUserData } from "../../hooks/user.actions";
import { KeyedMutator } from "swr";
import { FiSend } from "react-icons/fi";

interface CreateCommentProps {
  currentPost: IPost;
  refresh: KeyedMutator<any>;
}

const CreateComment = ({ currentPost, refresh }: CreateCommentProps) => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = getUserData();

  const createCommentHandler = () => {
    if (body == "") return;

    setLoading(true);
    const data = {
      body: body,
      author: user.id,
      post: currentPost.id,
    };
    axiosService
      .post(`/post/${currentPost.id}/comment/`, data)
      .then((res) => {
        setBody("");
        toast({
          title: "Comment Added",
          description: "Comment created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        refresh();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: err.message,
          description: "Error creating comment",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };
  return (
    <InputGroup>
      <Input
        placeholder="Add a comment..."
        _placeholder={{ bgColor: "500.gray" }}
        borderRadius={"full"}
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <InputRightElement width="5rem">
        <Button
          fontSize={"sm"}
          rounded={"full"}
          bg={"blue.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
          isLoading={loading}
          loadingText="creating"
          onClick={createCommentHandler}
          leftIcon={<FiSend />}
        >
          Submit
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default CreateComment;
