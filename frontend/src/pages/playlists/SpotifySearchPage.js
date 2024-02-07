import React, { useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';

import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';
import { useSetSpotifyPlayerUri } from '../../contexts/SpotifyPlayerUriContext';

import SearchBar from '../../components/SearchBar';
import Playlist from '../../components/Playlist';
import AddPlaylistButton from '../../forms/AddPlaylistButton';

import styles from '../../styles/SpotifySearchPage.module.css';

const SpotifySearchPage = () => {
  const { handleAuthentication } = useSpotifyAuth();
  const setSpotifyPlayerUri = useSetSpotifyPlayerUri();
  const [searchResults, setSearchResults] = useState();
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = async (searchQuery) => {
    // Empty search field
    if (!searchQuery) {
      setErrors({ message: 'Search field is empty' });
      setShowAlert(true);
      return;
    }

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
        ...(data.albums?.items || []),
        ...(data.playlists?.items || []),
        ...(data.artists?.items || []),
      ];

      setSearchResults(combinedData);
    } catch (error) {
      setErrors({
        message: error.response?.data || 'An error occurred in fetching',
      });
      setShowAlert(true);
    }
  };

  const updateSpotifyPlayerUri = (uri) => {
    setSpotifyPlayerUri(uri);
  };

  return (
    <div>
      <h1>Spotify Page</h1>
      <SearchBar onSearch={handleSearch} />
      {showAlert && errors?.message && (
        <Alert
          variant='warning'
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {errors.message}
        </Alert>
      )}
      <Button onClick={handleAuthentication}>Authenticate</Button>
      <Container>
        <Row>
          {searchResults?.map((result) => (
            <Col className={styles.PaddingReset} key={result.id} xs={4} md={3}>
              <Button
                variant='link'
                onClick={() => updateSpotifyPlayerUri(result.uri)}
                className={styles.PaddingReset}
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
