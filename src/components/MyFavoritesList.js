import React from 'react';

import { ReactComponent as HeartFull } from '../assets/heartFull.svg';

const MyFavoritesList = ({
  videosNames,
  onClickName,
  isFavorite,
  onClickHeart,
}) => {
  const favsInfo = videosNames?.map((video, index) => ({
    id_name: video,
    fav: isFavorite[index],
  }));

  const filtered = favsInfo.filter((video) => video.fav);

  return (
    <ul class='unorderedList'>
      {filtered.map((video) => (
        <li key={video.id_name}>
          <a class='videoName' onClick={onClickName} href='/#'>
            {video.id_name}
          </a>
          <div class='heart'>
            <button
              value={video.id_videoId}
              title={video.id_name}
              onClick={onClickHeart}
            >
              {<HeartFull />}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyFavoritesList;
