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

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, link: "/" },
  { name: "Profile", icon: FiUser, link: "/profile/" },
  { name: "Explore", icon: FiCompass, link: "#" },
  { name: "Favourites", icon: FiStar, link: "#" },
  { name: "Settings", icon: FiSettings, link: "#" },
];

interface SidebarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function Sidebar({ isOpen, onOpen, onClose }: SidebarProps) {
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
}

interface SidebarContentProps {
  onClose: () => void;
}

const SiderbarContent = ({ onClose }: SidebarContentProps) => {
  const { user } = getUserData();

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
    </List>
  );
};
export default Sidebar;
