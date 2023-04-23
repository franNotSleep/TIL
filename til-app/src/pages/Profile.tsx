import { Box, Center, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

import ProfileDetails from '../components/profile/ProfileDetails';
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
          <ProfileDetails user={user.data} />

          <ProfileTab userPosts={userPosts.data} refresh={userPosts.mutate} user={user.data}/>
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
