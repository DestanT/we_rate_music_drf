import React from 'react';
import { Button } from 'react-bootstrap';
import useSpotifyAuth from '../../hooks/useSpotifyAuth';

const SpotifySearchPage = () => {
  const { handleAuthentication } = useSpotifyAuth();

  return (
    <div>
      <h1>Spotify Page</h1>
      <Button onClick={handleAuthentication}>Authenticate</Button>
    </div>
  );
};

export default SpotifySearchPage;
