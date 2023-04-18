import { Container, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

import RegisterForm from "../components/authentication/RegisterForm";
import images from "../constants/images";

const Register = () => {
  return (
    <Container maxW="2xl" p={5} display="flex" flexDirection="column">
      <Image
        src={images.lock}
        boxSize="70px"
        verticalAlign="center"
        m="auto"
        borderRadius="full"
        alt="Lock"
      />

      <Heading textAlign="center" as="h2" size="md">
        Sign Up
      </Heading>
      <RegisterForm />
      <NavLink to="/login/">
        <Text
          fontSize="sm"
          textAlign="center"
          color="blue.300"
          mb={5}
          sx={{
            ":hover": {
              color: "blue.600",
            },
          }}
        >
          I am already a user🤯
        </Text>
      </NavLink>
      <Text fontSize="sm" my={10} color="gray.400" textAlign="center">
        Copyright © TIL 2023.
      </Text>
    </Container>
  );
};

export default Register;
