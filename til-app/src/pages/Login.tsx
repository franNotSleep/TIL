import { Box, Container, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

import LoginForm from "../components/authentication/LoginForm";
import images from "../constants/images";

const Login = () => {
  return (
    <Container display="flex" flexDirection="column" p={5} my={5}>
      <Image
        src={images.lock}
        boxSize="70px"
        verticalAlign="center"
        m="auto"
        borderRadius="full"
        alt="Lock"
      />

      <Heading as="h2" size="md" textAlign="center" mb={10}>
        Sign In
      </Heading>

      <LoginForm />

      <Box>
        <NavLink to="/register/">
          <Text
            fontSize="sm"
            my={10}
            textAlign="center"
            color="blue.300"
            sx={{
              ":hover": {
                color: "blue.600",
              },
            }}
          >
            Don't have an account? Sign Up
          </Text>
        </NavLink>
      </Box>

      <Text fontSize="sm" my={10} color="gray.400" textAlign="center">
        Copyright © TIL 2023.
      </Text>
    </Container>
  );
};

export default Login;
