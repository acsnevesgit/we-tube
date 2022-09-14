
import React from 'react';

import { MdDashboard, MdHistory, MdHome, MdOndemandVideo, MdWatchLater, MdWhatshot, MdSubscriptions, MdThumbUp, MdVideoLibrary } from 'react-icons/md'

const SideBar = () => {

  const SideBarRow = ({ selected, Icon, title }) => {
    <div class={`sidebar-row ${selected ? 'selected' : ''}`}>
      <Icon class='sidebar-row-icon' />
      <h2 class='sidebar-row-title'>{title}</h2>
    </div>
  }

  return (
    <div class='sidebar'>
      <SideBarRow selected Icon={MdHome} title='Home' />
      <SideBarRow Icon={MdWhatshot} title='What&rsquo;s hot' />
      <SideBarRow Icon={MdDashboard} title='Statistics' />
      <SideBarRow Icon={MdSubscriptions} title='Subscriptions' />
      <SideBarRow Icon={MdVideoLibrary} title='Library' />
      <SideBarRow Icon={MdHistory} title='History' />
      <SideBarRow Icon={MdOndemandVideo} title='My videos' />
      <SideBarRow Icon={MdWatchLater} title='Watch later' />
      <SideBarRow Icon={MdThumbUp} title='Liked videos' />
    </div>
  )
};

export default SideBar;

