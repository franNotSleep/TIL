import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Post, { IPost } from '../components/post/Post';
import ProfileCard from '../components/profile/ProfileCard';
import ProfileTab from '../components/profile/ProfileTab';
import { fetcher } from '../helpers/axios';

const Profile = () => {
  const { profileId } = useParams();
  const user = useSWR(`/user/${profileId}`, fetcher);
  const userPosts = useSWR(`/post?author__public_id=${profileId}`, fetcher);

  return (
    <Box>
      {user.isLoading == false && userPosts.isLoading == false ? (
        <>
          <ProfileCard user={user.data}/>
          {/* POSTS PANEL */}
          {userPosts.data.results.length === 0 ? (
            <Text>No posts yet.</Text>
          ) : (
            userPosts.data.results.map((post: IPost) => (
              <Post post={post} key={post.id} refresh={userPosts.mutate} />
            ))
          )}
        </>
      ) : (
        <Center>
          <Spinner size="xl" />
        </Center>
      )}
    </Box>
  );
};

export default Profile;
