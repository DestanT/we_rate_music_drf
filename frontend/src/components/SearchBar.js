import React, { useState } from 'react';
import btnStyles from '../styles/Button.module.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='searchForm'>
        <InputGroup>
          <Form.Control
            type='text'
            placeholder='Search Spotify'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputGroup.Append>
            <Button type='submit' className={btnStyles.Button}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ color: '#5a5550' }}
                size='lg'
              />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
