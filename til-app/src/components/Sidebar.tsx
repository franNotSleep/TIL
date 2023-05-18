import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  List,
  ListIcon,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { getUserData } from "../hooks/user.actions";
import SearchProfiles from "./profile/SearchProfiles";

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "/" },
  { name: "Profile", icon: FiUser, link: "/profile/" },
];

interface SidebarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onOpen, onClose }: SidebarProps) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={onClose} />
          <SiderbarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box minH="100vh" display={{ base: "none", lg: "block" }}>
        <SiderbarContent onClose={onClose} />
      </Box>
    </>
  );
};

interface SidebarContentProps {
  onClose: () => void;
}

const SiderbarContent = ({ onClose }: SidebarContentProps) => {
  const { user } = getUserData();
  const { isOpen, onOpen, onClose: onCloseSearch } = useDisclosure();

  return (
    <List spacing={5} fontSize="1.0em" p={4}>
      <NavLink to="/">
        <Heading>TIL</Heading>
      </NavLink>
      {LinkItems.map((item) => (
        <ListItem key={item.name}>
          <NavLink
            to={item.link == "/profile/" ? "/profile/" + user.id : item.link}
            onClick={onClose}
          >
            <ListIcon as={item.icon} color="gray.500" />
            {item.name}
          </NavLink>
        </ListItem>
      ))}
      <ListItem>
        <NavLink to={"#"} onClick={onOpen}>
          <ListIcon as={FiCompass} color="gray.500" />
          Search Users
        </NavLink>
      </ListItem>
      <SearchProfiles
        isOpen={isOpen}
        onCloseSearch={onCloseSearch}
        onCloseSidebar={onClose}
      />
    </List>
  );
};

export default Sidebar;
