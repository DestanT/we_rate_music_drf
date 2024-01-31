import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <Form.Group controlId='searchForm'>
        <Form.Control
          type='text'
          placeholder='Search Spotify'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type='submit' className='my-1'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
