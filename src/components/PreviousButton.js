import React from 'react';

const PreviousButton = ({ onClick }) => (
  <button data-testid='previousVideo' onClick={onClick}>
    Previous
  </button>
);

export default PreviousButton;
