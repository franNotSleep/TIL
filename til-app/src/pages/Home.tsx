import { Center, Container, Grid, GridItem, Spinner } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

import CreatePost from "../components/post/CreatePost";
import Post, { IPost } from "../components/post/Post";
import ProfileList from "../components/profile/ProfileList";
import { fetcher } from "../helpers/axios";

const Home = () => {
  const posts = useSWR("/post", fetcher, {
    refreshInterval: 20000,
  });

  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem colSpan={{ base: 6, lg: 4, xl: 5 }}>
        <CreatePost refresh={posts.mutate} />

        <Container maxW="2xl">
          {posts.isLoading == false ? (
            posts.data?.results.map((post: IPost) => (
              <Post key={post.id} post={post} refresh={posts.mutate} />
            ))
          ) : (
            <Center>
              <Spinner size="xl" />
            </Center>
          )}
        </Container>
      </GridItem>

      <GridItem colSpan={{ base: 6, lg: 2, xl: 1 }}>
        <Container maxW="sm">
          <ProfileList />
        </Container>
      </GridItem>
    </Grid>
  );
};

export default Home;
