import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Form } from "react-router-dom";
import { KeyedMutator } from "swr";

import axiosService from "../../helpers/axios";
import { IPost } from "./Post";

interface PropsEditPost {
  isOpen: boolean;
  onClose: () => void;
  post: IPost;
  refresh: KeyedMutator<any>;
}

const EditPost = ({ isOpen, onClose, post, refresh }: PropsEditPost) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: post.title,
    body: post.body,
    author: post.author,
  });

  const onSubmit = () => {
    setLoading(true);
    const data = {
      title: form.title,
      author: form.author.id,
      body: form.body,
    };
    axiosService
      .put(`/post/${post.id}/`, data)
      .then((res) => {
        // show success toast
        toast({
          title: "Success",
          description: "Post updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        refresh();
        setLoading(false);
        onClose();
      })
      .catch((err) => {
        // show error toast
        setLoading(false);
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form>
              <FormControl isRequired mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Body</FormLabel>
                <Textarea
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                />
              </FormControl>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onSubmit}
              isLoading={loading}
            >
              Save
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPost;
