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
  Spacer,
  Text,
} from "@chakra-ui/react";
import { FcPrivacy } from "react-icons/fc";
import { NavLink } from "react-router-dom";

import { getUserData, useUserActions } from "../hooks/user.actions";

const Navbar = () => {
  const userActions = useUserActions();
  const { user } = getUserData();
  return (
    <Flex bg="gray.100" p={5}>
      <Heading>TIL</Heading>
      <Spacer />

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
            <NavLink to="/profile/">
              <Text>Profile</Text>
            </NavLink>
          </MenuItem>
          <MenuItem
            onClick={() => userActions.logout(<FcPrivacy size="40px" />)}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Navbar;
