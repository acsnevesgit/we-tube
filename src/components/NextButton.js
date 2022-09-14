import React from 'react';

const NextButton = ({ onClick }) => (
  <button data-testid='nextVideo' onClick={onClick}>
    Next
  </button>
);

export default NextButton;
