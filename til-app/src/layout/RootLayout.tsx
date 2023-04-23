import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const RootLayout = () => {
  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem minHeight="100%" as="aside" colSpan={{ base: 6, lg: 1 }}>
        <Sidebar />
      </GridItem>
      <GridItem as="main" colSpan={{ base: 6, lg: 5 }}>
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default RootLayout;
