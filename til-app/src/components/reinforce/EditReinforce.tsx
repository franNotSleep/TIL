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
import { IReinforce } from "./Reinforce";

interface CreateReinforceProps {
  currentPost: IPost;
  reinforce: IReinforce;
  refresh: KeyedMutator<any>;
  isOpen: boolean;
  onClose: () => void;
}

const EditReinforce = ({
  currentPost,
  refresh,
  reinforce,
  isOpen,
  onClose,
}: CreateReinforceProps) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = getUserData();

  const editHandler = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append("author", user.id);
    formData.append("post", currentPost.id);

    if (!formData.get("photo")?.toString && reinforce.photo) {
      formData.set("photo", reinforce.photo);
    }

    axiosService
      .put(`/post/${currentPost.id}/reinforce/${reinforce.id}/`, formData, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        // Show success toast
        toast({
          title: "Reinforce",
          description: "Successfully Updated",
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalCloseButton />
        <ModalContent>
          <ModalBody>
            <Form onSubmit={editHandler}>
              <FormControl isRequired>
                <FormLabel>Bring something</FormLabel>
                <Textarea name="body" defaultValue={reinforce.body} />
              </FormControl>
              <FormControl>
                <FormLabel>Change picture</FormLabel>
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
                    <Input
                      placeholder="source"
                      name="source"
                      defaultValue={reinforce.source}
                    />
                  </InputGroup>
                </FormLabel>
              </FormControl>
              <Button
                type="submit"
                isLoading={loading}
                loadingText="Editing"
                fontSize={"sm"}
                rounded={"full"}
                _focus={{
                  bg: "gray.200",
                }}
              >
                Save
              </Button>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default EditReinforce;
