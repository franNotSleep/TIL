import { AtSignIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcApproval, FcDisclaimer } from "react-icons/fc";
import { Form, useNavigate } from "react-router-dom";

interface InputError {
  email?: string[];
  username?: string[];
  first_name?: string[];
  last_name?: string[];
  password?: string[];
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    password1: "",
    password2: "",
  });

  const [isDifferentPassword, setIsDifferentPassword] = useState(false);
  const [inputError, setInputError] = useState<InputError>();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (form.password1 != form.password2) {
      setIsDifferentPassword(true);
    } else {
      setIsDifferentPassword(false);
    }
  }, [form.password1, form.password2]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let inputName = event.target.name;
    setForm({ ...form, [inputName]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    if (form.password1 != form.password2) {
      toast({
        title: "Password",
        description: "Passwords must be equal.",
        status: "error",
        duration: 6000,
        icon: <FcDisclaimer size="40px" />,
        position: "top",
      });
      setLoading(false);
      return;
    }
    const data = {
      username: form.username,
      email: form.email,
      password: form.password1,
      first_name: form.first_name,
      last_name: form.last_name,
      bio: !form.bio ? "No bio." : form.bio,
    };

    axios
      .post("http://localhost:8000/api/auth/register/", data)
      .then((res) => {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            access: res.data.access,
            refresh: res.data.refresh,
            user: res.data.user,
          })
        );

        toast({
          title: "Logged In",
          description: "Successfully",
          status: "success",
          duration: 6000,
          icon: <FcApproval size="40px" />,
          position: "top",
        });

        navigate("/");

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data) {
          setInputError(err.response.data);
          toast({
            title: err.message,
            status: "error",
            duration: 6000,
            icon: <LockIcon />,
            position: "top",
          });
        }

        setLoading(false);
      });
  };
  return (
    <Box p={5}>
      <Form onSubmit={handleSubmit}>
        <HStack spacing={3} mb={10}>
          <FormControl isInvalid={inputError?.first_name ? true : false}>
            <InputGroup>
              <InputLeftElement children={<AtSignIcon color="gray.500" />} />
              <Input
                type="text"
                placeholder="First Name"
                variant="flushed"
                name="first_name"
                onChange={handleChange}
                value={form.first_name}
              />
            </InputGroup>
            <FormErrorMessage>
              {inputError?.first_name && inputError?.first_name[0]}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={inputError?.last_name ? true : false}>
            <InputGroup>
              <InputLeftElement children={<AtSignIcon color="gray.500" />} />
              <Input
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                variant="flushed"
              />
            </InputGroup>
            <FormErrorMessage>
              {inputError?.last_name && inputError?.last_name[0]}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl isInvalid={inputError?.username ? true : false} mb={5}>
          <InputGroup>
            <InputLeftElement children={<AtSignIcon color="gray.500" />} />
            <Input
              type="text"
              placeholder="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              variant="flushed"
            />
          </InputGroup>
          <FormErrorMessage mb={10}>
            {inputError?.username && inputError?.username[0]}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={inputError?.email ? true : false}>
          <InputGroup>
            <InputLeftElement children={<EmailIcon color="gray.500" />} />
            <Input
              type="text"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              variant="flushed"
              value={form.email}
            />
          </InputGroup>
          <FormErrorMessage>
            {inputError?.email && inputError?.email[0]}
          </FormErrorMessage>
        </FormControl>

        <HStack spacing={3} my={10}>
          <FormControl isInvalid={inputError?.password ? true : false}>
            <InputGroup>
              <InputLeftElement children={<LockIcon color="gray.500" />} />
              <Input
                value={form.password1}
                type="password"
                onChange={handleChange}
                placeholder="Password"
                name="password1"
                variant="flushed"
              />
            </InputGroup>
            <FormErrorMessage>
              {inputError?.password && inputError?.password[0]}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={inputError?.password ? true : false}>
            <InputGroup>
              <InputLeftElement children={<LockIcon color="gray.500" />} />
              <Input
                isInvalid={isDifferentPassword}
                errorBorderColor={"red.400"}
                focusBorderColor={isDifferentPassword ? "red.400" : ""}
                type="password"
                onChange={handleChange}
                value={form.password2}
                placeholder="Repeat password"
                name="password2"
                variant="flushed"
              />
            </InputGroup>
            <FormErrorMessage>
              {inputError?.password && inputError?.password[0]}
            </FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel textColor="gray.500">Bio:</FormLabel>
          <Textarea
            placeholder="Tell us something about you."
            name="bio"
            value={form.bio}
            onChange={handleChange}
          />
          <FormHelperText color="gray.500">
            This field is optional.
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          my={10}
          width="100%"
          isLoading={loading}
          loadingText="Verifying"
        >
          Sign Up
        </Button>
      </Form>
    </Box>
  );
};

export default RegisterForm;
