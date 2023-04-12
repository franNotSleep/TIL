import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const data = {
      email: form.email,
      password: form.password,
    };

    axios
      .post("http://localhost:8000/api/auth/login/", data)
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
          icon: <UnlockIcon />,
          position: "top",
        });

        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        if (err.message) {
          toast({
            title: err.message,
            description: err.response.data.detail,
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
