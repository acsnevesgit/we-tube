import React from 'react';

import { ReactComponent as Heart } from '../assets/heart.svg';
import { ReactComponent as HeartFull } from '../assets/heartFull.svg';

const AllVideosList = ({ videos, onClickName, isFavorite, onClickHeart }) => {

  return (
    <ul class='unorderedList'>
      {videos?.map((video, index) => (
        <li key={video.id_videoId}>
          <a class='videoName' onClick={onClickName} href='/#'>
            {video.id_name}
          </a>
          <div class='heart'>
            <button
              id={index}
              value={isFavorite[index]}
              name={video.id_videoId}
              title={video.id_name}
              onClick={onClickHeart}
            >
              {isFavorite[index] ? <HeartFull /> : <Heart />}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AllVideosList;
