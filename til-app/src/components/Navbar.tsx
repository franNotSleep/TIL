import {
  Avatar,
  Button,
  Center,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcPrivacy } from "react-icons/fc";
import { NavLink } from "react-router-dom";

import { getUserData, useUserActions } from "../hooks/user.actions";

const Navbar = () => {
  const userActions = useUserActions();
  const { user } = getUserData();

  return (
    <Flex
      bg="gray.100"
      p={4}
      justifyContent={{ base: "space-around", lg: "space-between" }}
    >
      <NavLink to="/">
        <Heading>TIL</Heading>
      </NavLink>

      <Menu>
        <MenuButton
          as={Button}
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
        >
          <Avatar
            size={"sm"}
            src={"https://avatars.dicebear.com/api/male/username.svg"}
          />
        </MenuButton>
        <MenuList alignItems={"center"}>
          <br />
          <Center>
            <Avatar
              size={"2xl"}
              src={"https://avatars.dicebear.com/api/male/username.svg"}
            />
          </Center>
          <br />
          <Center>
            <p>{user.username}</p>
          </Center>
          <br />
          <MenuDivider />
          <MenuItem>
            <NavLink to={`/profile/${user.id}`}>
              <Button variant="link">Profile</Button>
            </NavLink>
          </MenuItem>
          <MenuItem
            onClick={() => userActions.logout(<FcPrivacy size="40px" />)}
          >
            <Button variant="link" colorScheme="red">
              Logout
            </Button>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Navbar;
