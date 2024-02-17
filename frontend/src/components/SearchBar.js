import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, InputGroup, Row, Col, Container } from 'react-bootstrap';

import Avatar from './Avatar';
import LoadingSpinner from './LoadingSpinner';

import styles from '../styles/SearchBar.module.css';
import btnStyles from '../styles/Button.module.css';
import loadingStyles from '../styles/LoadingSpinner.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { axiosReq } from '../api/axiosDefaults';

function SearchBar({ onSearch, liveSearch = false }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (liveSearch) {
      const fetchedItems = async () => {
        try {
          const { data } = await axiosReq.get(
            `profiles/?search=${searchQuery}`
          );
          setItems(data.results);
          console.log(data.results);
          setShowDropdown(data.results.length > 0);
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };
      setHasLoaded(false);
      fetchedItems();
    }
  }, [liveSearch, searchQuery]);

  // This is function is disabled in the <Button> element, if liveSearch is truthy
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e) => {
    const currentQuery = e.target.value;
    setSearchQuery(currentQuery);
    console.log(currentQuery);

    if (currentQuery === '') {
      setShowDropdown(false);
      return;
    }
  };

  const dropdownResults = hasLoaded ? (
    <Container className={styles.DropdownMenu}>
      {items?.length ? (
        items.map((profile) => (
          <Row
            key={profile.id}
            className={styles.DropdownItem}
            onClick={() => {
              history.push(`/profile/${profile.id}`);
            }}
          >
            <Avatar src={profile.image} height={75} />
            <Col>{profile.owner}</Col>
          </Row>
        ))
      ) : (
        <Container className={styles.DropdownMenu}>
          <Row className={styles.DropdownItem}>
            <Col xs={12}>No results found</Col>
          </Row>
        </Container>
      )}
    </Container>
  ) : (
    <Container className={styles.DropdownMenu}>
      <LoadingSpinner className={loadingStyles.Centered} />
    </Container>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='searchForm' style={{ marginBottom: '0' }}>
          <InputGroup>
            <Form.Control
              type='text'
              placeholder={liveSearch ? 'Search for users' : 'Search Spotify'}
              onChange={handleInputChange}
              value={searchQuery}
            />
            <InputGroup.Append>
              {liveSearch ? null : (
                <Button type='submit' className={btnStyles.Button}>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: '#3d3d3d' }}
                    size='lg'
                  />
                </Button>
              )}
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
      {liveSearch && showDropdown && dropdownResults}
    </>
  );
}

export default SearchBar;
