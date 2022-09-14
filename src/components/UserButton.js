import React from 'react';

import { ReactComponent as User } from '../assets/user.svg';

const UserButton = ({ onClick }) => (
  <button class='userButton' onClick={onClick}>
    {<User />}
  </button>
);

export default UserButton;
