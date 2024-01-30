import React from 'react';
import { Button } from 'react-bootstrap';
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';
import { getUsersProfile } from '../../api/spotifyApi/getUsersProfile';
import { searchForItem } from '../../api/spotifyApi/searchForItem';

const SpotifySearchPage = () => {
  const { handleAuthentication } = useSpotifyAuth();

  return (
    <div>
      <h1>Spotify Page</h1>
      <Button onClick={handleAuthentication}>Authenticate</Button>
      <Button onClick={getUsersProfile}>get profile</Button>
      <Button onClick={searchForItem}>searchForItem</Button>
    </div>
  );
};

export default SpotifySearchPage;
