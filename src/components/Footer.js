import React from 'react';

import { ReactComponent as Facebook } from '../assets/facebook.svg';
import { ReactComponent as Twitter } from '../assets/twitter.svg';
import { ReactComponent as Instagram } from '../assets/instagram.svg';

const Footer = () => (
  <div class='footerInfo'>
    <div>
      <p class='footerTitle'>WeTube</p>
    </div>
    <div class='socialMedia'>
      <nav>
        <a href='https://www.facebook.com' class='socialMediaIcon'>
          <Facebook />
        </a>
        <a href='https://www.twitter.com' class='socialMediaIcon'>
          <Twitter />
        </a>
        <a href='https://www.instagram.com' class='socialMediaIcon'>
          <Instagram />
        </a>
      </nav>
    </div>
  </div>
);

export default Footer;
