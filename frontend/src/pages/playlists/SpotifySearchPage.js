import React, { useState } from 'react';
import playlistStyles from '../../styles/Playlist.module.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSpotifyAuth } from '../../hooks/useSpotifyAuth';
import { getUsersProfile } from '../../api/spotifyApi/getUsersProfile';
import { searchForItem } from '../../api/spotifyApi/searchForItem';
import SearchBar from '../../components/SearchBar';
import Playlist from '../../components/Playlist';
import { normaliseSpotifyData } from '../../utils/dataUtils';
import AddPlaylist from '../../forms/AddPlaylist';

const SpotifySearchPage = () => {
  const [searchResults, setSearchResults] = useState();
  const { handleAuthentication } = useSpotifyAuth();

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
      setSearchResults(data.artists.items);
    } catch (error) {
      console.log(error);
    }
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
            <Col key={result.id} xs={4} md={3} className={playlistStyles.Col}>
              <Playlist data={normaliseSpotifyData(result)} />
              <AddPlaylist playlist={result} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default SpotifySearchPage;
