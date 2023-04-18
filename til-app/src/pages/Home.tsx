import { Box, Center, Container, Spinner } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

import CreatePost from "../components/post/CreatePost";
import Post, { IPost } from "../components/post/Post";
import { fetcher } from "../helpers/axios";

const Home = () => {
  const posts = useSWR("/post", fetcher, {
    refreshInterval: 20000,
  });
  return (
    <Box>
      <CreatePost refresh={posts.mutate} />

      <Container maxW="4xl">
        {posts.isLoading == false ? (
          posts.data?.results.map((post: IPost) => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <Center>
            <Spinner size="xl" />
          </Center>
        )}
      </Container>
    </Box>
  );
};

export default Home;
