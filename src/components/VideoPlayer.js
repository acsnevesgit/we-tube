import React from 'react';

const VideoPlayer = ({ data }) => (
  <iframe
    width='500'
    height='300'
    src={`https://www.youtube.com/embed/${data}`}
    title='VideoEmbed'
    frameBorder='0'
    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    allowFullScreen
  ></iframe>
);

export default VideoPlayer;
