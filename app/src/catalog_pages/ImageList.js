import React, { useState, useEffect } from 'react';
import Popup from './Popup';

function ImageList({ httpResponse }) {
  const [videos, setVideos] = useState([]);
  const [PopupData, setPopupData] = useState([]);
  const [isPopup, setPopup] = useState(false);


  useEffect(() => {
    setVideos(httpResponse);
  }, [httpResponse]);

  function handleClick(video) {
    setPopupData(video);
    setPopup(true);
  }

  function handleClosePopup() {
    setPopup(false);
  }

  return (
    <div>      
      {videos.map((video, index) => (
        <span key={video.poster_path}>
          <img onClick={() => handleClick(video)} width={200} src={'https://image.tmdb.org/t/p/original' + video.poster_path} alt={`${index + 1}`} />
        </span>
      ))}
      <Popup active={isPopup} metadata={PopupData} onClose={handleClosePopup} />
    </div>
  );
}

export default ImageList;


