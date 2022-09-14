import React, { useState, useEffect } from 'react';

import data from './assets/data.json';

import Header from './components/Header';
import Home from './components/Home';
import Playback from './components/Playback';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState();
  const [viewHomePage, setViewHomePage] = useState(
    () => JSON.parse(localStorage.getItem('home')) ?? true);
  const [viewFilteredList, setViewFilteredList] = useState(
    () => JSON.parse(localStorage.getItem('list')) ?? false);

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
      localStorage.setItem('home', JSON.stringify(false));
      localStorage.setItem('list', JSON.stringify(false));
      setVideoId(data[findVideoIndex]);
      setViewHomePage(false);
      setViewFilteredList(false);
    };

    const playVideoOnClick = (event) => {
      const searchedVideoName = event.target.name;

      const findVideoIndex = videos.findIndex(
        (v) => v.videoName === `${searchedVideoName}`
      );

      localStorage.setItem('currentIndex', JSON.stringify(data[findVideoIndex]));
      localStorage.setItem('home', JSON.stringify(false));
      localStorage.setItem('list', JSON.stringify(false));
      setVideoId(data[findVideoIndex]);
      setViewHomePage(false);
      setViewFilteredList(false);
    };

    const getHome = () => {
      localStorage.setItem('home', JSON.stringify(true));
      localStorage.setItem('list', JSON.stringify(false));
      setViewHomePage(true);
      setViewFilteredList(false);

    };

    const getVideosOnEnter = (event) => {
      // localStorage.setItem('home', JSON.stringify(false));
      // localStorage.setItem('list', JSON.stringify(true));
      // setViewHomePage(false);
      // setViewFilteredList(true);
      console.log(event);
    };

    return (
      <div class='App'>
        <div class='header child'><Header /></div>
        <div class='wrapper'>
          <Sidebar class='child' onClick={getHome} />
          <div class='main child'>
            <SearchBar data={videos} placeholder='Enter a video name' onClick={getVideoOnClick} onKeyPress={getVideosOnEnter} />
            {viewHomePage ? (
              <Home data={videos} onClick={playVideoOnClick} />
            ) : (
              <Playback data={video_id} />
            )}
            {/* {viewFilteredList ? (
              <FilteredList data={videos} />
            ) : null} */}
          </div>
        </div>
        <div class='child footer'><Footer /></div>
      </div>
    )
  };
};

export default App;