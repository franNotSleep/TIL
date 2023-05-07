import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FcApproval,
  FcDisclaimer,
  FcGoodDecision,
  FcReading,
  FcShare,
} from "react-icons/fc";
import { Form } from "react-router-dom";
import { KeyedMutator } from "swr";

import images from "../../constants/images";
import axiosService from "../../helpers/axios";
import { getUserData, InputError } from "../../hooks/user.actions";

interface PropsCreatePost {
  refresh: KeyedMutator<any>;
}

export interface FormValues { 
  title: string;
  body: string;
  photo: null | File;
}

const CreatePost = ({ refresh }: PropsCreatePost) => {
  const { user } = getUserData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [inputError, setInputError] = useState<InputError>();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormValues>({
    title: "",
    body: "",
    photo: null
  });

  // handle change of inputs by his name
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let inputName = event.target.name;
    setForm({ ...form, [inputName]: event.target.value });
  };

  const clickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLoading(true);
    const data = {
      author: user.id,
      title: form.title,
      body: form.body,
      photo: form.photo
    };

    axiosService
      .post("/post/", data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then(() => {
        setForm({
          title: "",
          body: "",
        });
        onClose();
        toast({
          title: "Post created successfully",
          description: "Post created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
          icon: <FcApproval size="40px" />,
        });
        refresh();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data) {
          setInputError(err.response.data);
        }

        toast({
          title: err.message ?? "Post creation failed",
          description: "Post creation failed",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          icon: <FcDisclaimer size="40px" />,
        });
      });
  };

  return (
    <Box>
      <Card
        p={5}
        m="auto"
        my={5}
        mb={5}
        w={{ base: "100%", lg: "xl", xl: "2xl" }}
      >
        <HStack>
          <Avatar src={user.avatar} />
          <Spacer />
          <Input
            onClick={onOpen}
            variant="filled"
            placeholder={`What did you learned today?`}
            borderRadius="full"
            isReadOnly
            size="sm"
          />
        </HStack>
      </Card>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalHeader p={5}>
            <Center w="100%">
              <HStack mb={5}>
                <Image src={images.notebook} boxSize="20px" />
                <Text>Share what you have learned</Text>
                <Image src={images.puzzle} boxSize="20px" />
              </HStack>
            </Center>

            <HStack gap={5}>
              <Avatar
                src={user.avatar}
              />
              <Box>
                <Text>{user.username}</Text>
                <Text color="gray.200" fontSize={"sm"}>
                  {user.email}
                </Text>
              </Box>
            </HStack>
          </ModalHeader>
          <ModalBody p={5}>
            <Form>
              <FormControl
                isRequired
                mb={5}
                isInvalid={inputError?.title ? true : false}
              >
                <FormLabel>Today I learned about</FormLabel>
                <InputGroup>
                  <InputLeftElement children={<FcReading />} />
                  <Input
                    placeholder="Subject"
                    value={form.title}
                    name="title"
                    onChange={handleChange}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {inputError?.title && inputError?.title[0]}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={inputError?.body ? true : false}
              >
                <HStack>
                  <FcGoodDecision />
                  <FormLabel>
                    Tell me more about {form.title ? form.title : "it"}
                  </FormLabel>
                </HStack>

                <Textarea
                  placeholder={`What did you learn about ${
                    form.title ? form.title : "it"
                  }?🤓`}
                  value={form.body}
                  name="body"
                  onChange={handleChange}
                />
                <FormErrorMessage>
                  {inputError?.body && inputError?.body[0]}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={2}>
                <FormLabel>Upload a Photo</FormLabel>
                <input 
                  type="file"
                  name="photo"
                  onChange={(event) => {
                    if (event.target.files) {
                      setForm({...form, photo: event.target.files[0]});
                    }
                  }}
                  accept="image/jpeg, image/png"
                />
              </FormControl>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="facebook"
              variant="outline"
              mx="10px"
              w="100%"
              leftIcon={<FcShare />}
              isLoading={loading}
              loadingText="Creating..."
              onClick={clickHandler}
            >
              Share
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreatePost;
