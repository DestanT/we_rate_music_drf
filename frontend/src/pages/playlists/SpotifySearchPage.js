import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';
import { useSetSpotifyPlayerUri } from '../../contexts/SpotifyPlayerUriContext';

import SearchBar from '../../components/SearchBar';
import Playlist from '../../components/Playlist';
import AddPlaylistButton from '../../forms/AddPlaylistButton';

import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';

const SpotifySearchPage = () => {
  const { handleAuthentication } = useSpotifyAuth();
  const setSpotifyPlayerUri = useSetSpotifyPlayerUri();
  const [searchResults, setSearchResults] = useState();

  const handleSearch = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchQuery}&type=album%2Cplaylist%2Cartist&limit=50`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      );
      const data = await response.json();

      // Combine the items from albums, playlists, and artists
      const combinedData = [
        ...data.albums.items,
        ...data.playlists.items,
        ...data.artists.items,
      ];

      setSearchResults(combinedData);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSpotifyPlayerUri = (uri) => {
    setSpotifyPlayerUri(uri);
  };

  return (
    <div>
      <h1>Spotify Page</h1>
      <SearchBar onSearch={handleSearch} />
      <Button onClick={handleAuthentication}>Authenticate</Button>
      <Container>
        <Row>
          {searchResults?.map((result) => (
            <Col
              className={appStyles.PaddingReset}
              key={result.id}
              xs={4}
              md={3}
            >
              <Button
                variant='link'
                onClick={() => updateSpotifyPlayerUri(result.uri)}
                className={btnStyles.Button}
              >
                <Playlist image={result.images[0]?.url} title={result.name} />
              </Button>
              <AddPlaylistButton playlistData={result} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SpotifySearchPage;
