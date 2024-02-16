import React, { useEffect, useState } from 'react';
import { Form, Button, InputGroup, Dropdown, Row, Col } from 'react-bootstrap';

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

  const dropdownResults = (
    <Dropdown show={showDropdown}>
      <Dropdown.Menu className={styles.DropdownMenu}>
        {items?.length ? (
          items.map((profile) => (
            <Dropdown.Item key={profile.id} className={styles.DropdownItem}>
              <Row>
                <Col xs={3}>
                  <img
                    src={profile.image}
                    alt={`${profile.owner}`}
                    className={styles.SearchResultImage}
                  />
                </Col>
                <Col xs={6}>{profile.owner}</Col>
              </Row>
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item className={styles.DropdownItem}>
            <Row>
              <Col xs={12}>No results found</Col>
            </Row>
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='searchForm'>
          <InputGroup>
            <Form.Control
              type='text'
              placeholder={
                liveSearch ? 'Search for other users' : 'Search Spotify'
              }
              onChange={handleInputChange}
              value={searchQuery}
            />
            <InputGroup.Append>
              {liveSearch ? (
                <Button disabled className={btnStyles.Button}>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: '#3d3d3d' }}
                    size='lg'
                  />
                </Button>
              ) : (
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
      {liveSearch && hasLoaded ? (
        dropdownResults
      ) : (
        <LoadingSpinner className={loadingStyles.Centered} />
      )}
    </>
  );
}

export default SearchBar;
