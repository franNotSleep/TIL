import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const RootLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem as="aside" colSpan={{ base: 6, lg: 1 }}>
        <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </GridItem>
      <GridItem as="main" colSpan={{ base: 6, lg: 5 }}>
        <Navbar isOpen={isOpen} onOpen={onOpen} />
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default RootLayout;
