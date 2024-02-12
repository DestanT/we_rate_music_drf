import React, { useState } from 'react';
import { Form, Button, InputGroup, Dropdown, Row, Col } from 'react-bootstrap';

import styles from '../styles/SearchBar.module.css';
import btnStyles from '../styles/Button.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSearch, liveSearch = false, data = null }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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

    console.log(e.target.value);
    if (liveSearch) {
      const filteredItems = data.results.filter(
        (item) =>
          item.title.toLowerCase().includes(currentQuery.toLowerCase()) ||
          item.owner.toLowerCase().includes(currentQuery.toLowerCase())
      );
      setFilteredResults(filteredItems);
      setShowDropdown(filteredItems.length > 0);
    }
  };

  const dropdownResults = (
    <Dropdown show={showDropdown}>
      <Dropdown.Menu className={styles.DropdownMenu}>
        {filteredResults.map((item) => (
          <Dropdown.Item key={item.id} className={styles.DropdownItem}>
            <Row>
              <Col xs={3}>
                <img
                  src={item.image}
                  alt={`${item.title}'s Cover Art`}
                  className={styles.SearchResultImage}
                />
              </Col>
              <Col xs={6}>{item.title}</Col>
              <Col xs={3}>
                <em>({item.owner}'s playlist)</em>
              </Col>
            </Row>
          </Dropdown.Item>
        ))}
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
              placeholder='Search Spotify'
              onChange={handleInputChange}
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
      {liveSearch ? dropdownResults : null}
    </>
  );
}

export default SearchBar;
