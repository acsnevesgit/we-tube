import React, { useState } from 'react';

import { ReactComponent as Logo } from '../assets/logo.svg';

const Header = () => {

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <header>
        <div class='header-logo' onClick={reloadPage}>
          <Logo class='logo' />
          <p class='header-title'>WeTube</p>
        </div>
        {/* <div class='nav-bar'>
          <p>Nav bar placeholder</p>
        </div> */}
      </header>
    </div>
  );
};

export default Header;
