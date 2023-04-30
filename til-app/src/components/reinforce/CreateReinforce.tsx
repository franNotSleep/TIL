import {
  Box,
  Textarea,
  FormControl,
  Center,
  Input,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Form } from "react-router-dom";
import axiosService from "../../helpers/axios";
import { IPost } from "../post/Post";
import { KeyedMutator } from "swr";
import { getUserData } from "../../hooks/user.actions";

interface CreateReinforceProps {
  currentPost: IPost;
  refresh: KeyedMutator<any>;
}

const CreateReinforce = ({ currentPost, refresh }: CreateReinforceProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = getUserData();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("author", user.id);
    formData.append("post", currentPost.id);

    axiosService
      .post(`/post/${currentPost.id}/reinforce/`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        // Show success toast
        toast({
          title: "Reinforce",
          description: "Successfully Created",
          status: "success",
          position: "top",
          duration: 2000,
        });
        onClose();
        refresh(); // Refresh all reinforces
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // Show error toast
        let errorInputMessage = undefined;
        let inputs = ["body", "author", "post", "photo", "source"];

        for (let input of inputs) {
          if (err.response.data[input]) {
            errorInputMessage = err.response.data[input][0];
            break;
          }
        }
        toast({
          title: "Reinforce",
          description: errorInputMessage ?? err.message,
          status: "error",
          position: "top",
          duration: 2000,
        });
        setLoading(false);
      });
  };
  return (
    <Center>
      <Input
        isReadOnly
        onClick={onOpen}
        placeholder="Create reinforce"
        borderRadius={"full"}
        _placeholder={{
          color: "green.500",
          textTransform: "uppercase",
          fontWeight: 800,
          fontSize: "sm",
          letterSpacing: 1.1,
        }}
        bg={"gray.200"}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalBody>
            <Form onSubmit={submitHandler}>
              <FormControl isRequired>
                <FormLabel>Bring something</FormLabel>
                <Textarea name="body" />
              </FormControl>
              <FormControl>
                <FormLabel>Share picture</FormLabel>
                <Input
                  name="photo"
                  type="file"
                  accept="image/png, image/jpeg"
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Link
                  <InputGroup size="sm">
                    <InputLeftAddon children="https://" />
                    <Input placeholder="source" name="source" />
                  </InputGroup>
                </FormLabel>
              </FormControl>
              <Button
                type="submit"
                isLoading={loading}
                loadingText="Creating"
                fontSize={"sm"}
                rounded={"full"}
                _focus={{
                  bg: "gray.200",
                }}
              >
                Submit
              </Button>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default CreateReinforce;
