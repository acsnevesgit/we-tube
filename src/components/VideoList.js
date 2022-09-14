import React from 'react';

const VideoList = ({ data }) => {
  return (
    <div class='videos'>
      {data.map((video) => (
        <div class='video-list' key={video.videoName}>
          <img class='video-list-thumbnail' src={video.videoThumbnail} alt='' />
          <div class='video-list-info'>
            <img
              class='video-list-avatar'
              alt=''
              src={video.channelThumbnail}
            />
            <div class='video-list-text'>
              <h4>{video.videoName}</h4>
              <p>{video.channelName}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;