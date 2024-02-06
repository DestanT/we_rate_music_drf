import React from 'react';
import { useParams } from 'react-router-dom';

import PlaylistsPage from './playlists/PlaylistsPage';
import Profile from '../components/Profile';

const ProfilePage = () => {
  const { userId } = useParams();
  return (
    <>
      <Profile userId={userId} />
      <PlaylistsPage filter={`owner__profile=${userId}`} />
    </>
  );
};

export default ProfilePage;
