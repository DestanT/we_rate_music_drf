import React from 'react';
import { useParams } from 'react-router-dom';

import { useRedirect } from '../hooks/useRedirect';

import PlaylistsPage from './PlaylistsPage';
import Profile from '../components/Profile';

const ProfilePage = () => {
  const { userId } = useParams();
  useRedirect();
  return (
    <>
      <Profile userId={userId} />
      <PlaylistsPage filter={`owner__profile=${userId}`} profileView />
    </>
  );
};

export default ProfilePage;
