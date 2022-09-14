import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import data from './data/data.json';

const App = () => {
  // ------*-------*------*------*-------- useStates ------*-------*------*------*--------
  const [videosDB, setVideosDB] = useState([data]);
  const [selectedVideo, setSelectedVideo] = useState(data[0]);

  const [videos, setVideos] = useState();
  const [videosNames, setVideosNames] = useState();
  const [videoId, setVideoId] = useState();

  const [index, setIndex] = useState(
    () => JSON.parse(localStorage.getItem('currentIndex')) ?? 0
  );

  // ------*-------*------*------*-------- getters and setters ------*-------*------*------*--------

  // Function to get all the videos from DB through the server -> ONCE
  const getVideos = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/videos`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const videosData = await response.json();
    setVideos(videosData);
  };

  // Function to change the video to be played from the search bar
  const getVideoOnClick = async (event) => {
    const newVideoId = event.target.target;
    const newName = event.target.text;

    const findVideoId = videos.findIndex(
      (x) => x.id_videoId === `${newVideoId}`
    );

    // If video not yet in the DB., add it
    if (Math.sign(findVideoId) !== 1) {
      const newEtag = Math.random().toString(20).slice(2); // generate random etag for the new video
      const newVideo = {
        id: videos.length + 1,
        kind: 'youtube#searchResult',
        etag: newEtag,
        id_kind: 'youtube#video',
        id_videoId: newVideoId,
        id_name: newName,
      };

      await fetch(`${process.env.REACT_APP_BACKEND_URL}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVideo),
        credentials: 'include',
      });
      getVideos();
      setIndex(videos.length);
    } else {
      setIndex(findVideoId);
    }
  };

  // Function to change the video to be played from the AllVideosList or MyFavoritesList
  const getNameOnClick = async (event) => {
    const newName = event.target.innerText;

    const newIndex = videos.findIndex(
      (x) => x.id_name === newName
    );
    setIndex(newIndex);
  };

  // Function to change the video to be played to the next video
  const getNext = async () => {
    if (videos !== undefined && index <= videos.length - 2) {
      setIndex(index + 1);
    } else {
      alert('Sorry, you have reached the end of the video list.');
    }
  };

  // Function to change the video to be played to the previous video
  const getPrevious = async () => {
    if (videos !== undefined && index >= 1) {
      setIndex(index - 1);
    } else {
      alert('Sorry, you have reached the end of the video list.');
    }
  };

  // Function to get the names of the videos
  const getVideosNames = async () => {
    if (videos !== undefined) {
      const names = videos?.map((video) => video.id_name);
      setVideosNames(names);
    }
  };

  // Function to get the videoId of video with the selected index
  const getVideoId = async () => {
    if (videos !== undefined) {
      setVideoId(videos[index].id_videoId);
    }
  };

  // ------*-------*------*------*-------- useEffects ------*-------*------*------*--------
  useEffect(() => {
    getVideosNames();
  }, [videos, index]);

  useEffect(() => {
    getVideoId();
  }, [videos, index]);

  useEffect(() => {
    localStorage.setItem('currentIndex', JSON.stringify(index));
  }, [index]);

  // ------*-------*------*------*-------- JSX ------*-------*------*------*--------

  return (
    <div class='App'>
      <div class='header child'><Header /></div>
      <div class='wrapper'>
        <Sidebar class='child' />
        <div class='main child'>
          <SearchBar placeholder='Enter a video name' onClick={getVideoOnClick} />
          <VideoPlayer data={videoId} />
        </div>
      </div>
      <div class='child footer'><Footer /></div>
    </div>
  );
}

export default App;