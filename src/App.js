import React, { useState, useEffect } from 'react';

import data from './assets/data.json';

import Header from './components/Header';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState();

  useEffect(() => {
    setVideos(data);
  }, [])

  useEffect(() => {
    setVideoId(() => JSON.parse(localStorage.getItem('currentIndex')) ?? data[0]);
  }, [videos])

  if (videos && videoId) {
    const video_id = videoId.videoId.split('?v=')[1];

    const getVideoOnClick = (event) => {
      const searchedVideoName = event.target.text;

      const findVideoIndex = videos.findIndex(
        (v) => v.videoName === `${searchedVideoName}`
      );

      localStorage.setItem('currentIndex', JSON.stringify(data[findVideoIndex]));
      setVideoId(data[findVideoIndex]);
    };

    return (
      <div class='App'>
        <div class='header child'><Header /></div>
        <div class='wrapper'>
          <Sidebar class='child' />
          <div class='main child'>
            <SearchBar data={videos} placeholder='Enter a video name' onClick={getVideoOnClick} />
            {/* <VideoPlayer data={video_id} /> */}
            <VideoList data={videos} />
          </div>
        </div>
        <div class='child footer'><Footer /></div>
      </div>
    )
  };
};

export default App;