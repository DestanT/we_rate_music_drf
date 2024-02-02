import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faCompactDisc} size='2xl' spin />
    </div>
  );
};

export default LoadingSpinner;
