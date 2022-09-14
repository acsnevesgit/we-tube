import React from 'react';

// TODO
const FilteredList = ({ data, onClick }) => {
  return (
    <div class='videos'>
      {data.map((video, index) => (
        <div class='home' key={video.videoName} onClick={onClick}>
          <img class='home-thumbnail' name={video.videoName} src={video.videoThumbnail} alt='' />
          <div class='home-info'>
            <img
              class='home-avatar'
              alt=''
              src={video.channelThumbnail}
            />
            <div class='home-text'>
              <h4>{video.videoName}</h4>
              <p>{video.channelName}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilteredList;