import { Box, Button, FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import { FcApproval, FcDisclaimer } from "react-icons/fc";
import { Form } from "react-router-dom";

import { useUserActions } from "../../hooks/user.actions";

/**

A form component for logging in users. It sends a POST request to the server with the user's
email and password and stores the access and refresh tokens and user data in local storage if
the login is successful. It displays success or error toast messages using Chakra UI.
@returns A login form component with email and password input fields and a sign-in button.
*/
const LoginForm = () => {
  const userActions = useUserActions();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      email: form.email,
      password: form.password,
    };

    userActions.login(
      data,
      <FcApproval size="40px" />,
      <FcDisclaimer size="40px" />,
      setLoading
    );
  };
  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <FormControl isRequired mb="20px">
          <Input
            size="lg"
            type="email"
            value={form.email}
            placeholder="Enter your email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </FormControl>

        <FormControl isRequired mb="20px">
          <Input
            size="lg"
            type="password"
            value={form.password}
            placeholder="Enter password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </FormControl>

        <Button
          w="100%"
          type="submit"
          isLoading={loading}
          loadingText="Logging In"
        >
          Sign In
        </Button>
      </Form>
    </Box>
  );
};

export default LoginForm;
