import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import SearchBar from './components/SearchBar';
import AllVideosLink from './components/AllVideosLink';
import NextButton from './components/NextButton';
import PreviousButton from './components/PreviousButton';
import AllVideosList from './components/AllVideosList';
import Footer from './components/Footer';
import SideBar from './components/SideBar';

import data from './data/data.json';

const App = () => {
  // ------*-------*------*------*-------- useStates ------*-------*------*------*--------
  const [videosDB, setVideosDB] = useState([data]);
  const [selectedVideo, setSelectedVideo] = useState(data[0]);

  const [videos, setVideos] = useState();
  const [favorites, setFavorites] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [videosNames, setVideosNames] = useState();
  const [videoId, setVideoId] = useState();
  const [showAll, setShowAll] = useState(true);
  const [showFav, setShowFav] = useState(false);

  const [index, setIndex] = useState(
    () => JSON.parse(localStorage.getItem('currentIndex')) ?? 0
  );
  const userLoggedin = JSON.parse(localStorage.getItem('isLoggedin')) ?? false;

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
    const isFavoriteData = videosData.map(() => false);
    setIsFavorite(isFavoriteData); // by default (e.g. user not logged in) all hearts untoggled
    setVideos(videosData);
  };

  // Function to get all the favorites from DB through the server
  const getFavorites = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/favorites`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );
    const favoritesData = await response.json();
    setFavorites(favoritesData); // One time after loggin
  };

  const getIsFavorite = async () => {
    const videosListNames = videos?.map(
      (video) => video.id_name
    );

    if (favorites !== undefined || []) {
      const favsListNames = await favorites?.map(
        (favorite) => favorite.id_name
      );

      const indexes = await favsListNames.map((x) =>
        videosListNames.indexOf(`${x}`)
      );

      const copyIsFavorite = [...isFavorite]; // use copy of current isFavorite instead of overwritting it

      await indexes.forEach((i) => {
        if (i !== undefined || -1) {
          copyIsFavorite.splice(i, 1, true); // replace each index of isFavorite with true if video is favorite
        }
      });
      setIsFavorite(copyIsFavorite); // One time after loggin
    }
  };

  const useAllList = () => {
    setShowFav(false);
    setShowAll(true);
  };

  const useFavList = () => {
    if (favorites !== undefined) {
      setShowFav(true);
      setShowAll(false);
    }
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

  // Function to add video to MyFavoritesList with DB
  const createHeart = async (event) => {
    const newFavorite = {
      id_videoId: event.target.name,
      id_name: event.target.title,
    };

    // If not favorite yet, add favorite
    if (!isFavorite[`${event.target.id}`]) {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFavorite),
        credentials: 'include',
      });
      const newFavorites = [...isFavorite];
      newFavorites[`${event.target.id}`] = true;
      setIsFavorite(newFavorites);
    } else {
      // if already favorite, remove favorite
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/favorites/${newFavorite.id_name}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );
      const newFavorites = [...isFavorite];
      newFavorites[`${event.target.id}`] = false;
      setIsFavorite(newFavorites);
    }
  };

  // Function to add video to MyFavoritesList with DB
  const deleteFavorite = async (event) => {
    const NameToUnfav = event.target.title;

    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/favorites/${NameToUnfav}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );

    const newFavorites = [...isFavorite];
    const nameIndex = videosNames.indexOf(`${NameToUnfav}`);
    newFavorites[`${nameIndex}`] = false;
    setIsFavorite(newFavorites);
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

  useEffect(() => {
    localStorage.setItem('isFavorite', JSON.stringify(isFavorite));
  }, [isFavorite]);

  // ------*-------*------*------*-------- JSX ------*-------*------*------*--------

  return (
    <div class='App'>
      <div class='header'>
        <Header />
      </div>
      <div class='navigation'>
        <div class='search-bar'>
          <SearchBar
            placeholder='Enter a video name'
            onClick={getVideoOnClick}
          />
        </div>
      </div>
      <SideBar />
      <div class='main'>
        <div class='main-left'>
          <VideoPlayer data={videoId} />
        </div>
        <div class='main-right'>
          <div class='links'>
            <div class={showAll ? 'active' : 'inactive'}>
              <AllVideosLink onClick={useAllList} />
            </div>
          </div>
          <div>
            <div>
              <AllVideosList
                videos={videos}
                onClickName={getNameOnClick}
                isFavorite={isFavorite}
                onClickHeart={createHeart}
              />
            </div>
          </div>
        </div>
      </div>
      <div class='buttons'>
        <div class='previous-button'>
          <PreviousButton onClick={getPrevious} />
        </div>
        <div class='next-button'>
          <NextButton onClick={getNext} />
        </div>
      </div>
      <div class='footer'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
