import React, { useState } from 'react';
import appStyles from '../../App.module.css';
import btnStyles from '../../styles/Button.module.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';
import { getUsersProfile } from '../../api/spotifyApi/getUsersProfile';
import { searchForItem } from '../../api/spotifyApi/searchForItem';
import SearchBar from '../../components/SearchBar';
import Playlist from '../../components/Playlist';
import { normaliseSpotifyData } from '../../utils/dataUtils';
import AddPlaylist from '../../forms/AddPlaylist';
import { useSetSpotifyPlayerUri } from '../../contexts/SpotifyPlayerUriContext';

const SpotifySearchPage = () => {
  const [searchResults, setSearchResults] = useState();
  const { handleAuthentication } = useSpotifyAuth();
  const setSpotifyPlayerUri = useSetSpotifyPlayerUri();

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
      console.log(combinedData);
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
      <Button onClick={getUsersProfile}>get profile</Button>
      <Button onClick={searchForItem}>searchForItem</Button>
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
                <Playlist data={normaliseSpotifyData(result)} />
              </Button>
              <AddPlaylist playlist={result} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SpotifySearchPage;
