import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import myImage from '../app/data/images/imageb65fa080-6d64-41d9-af0c-09007785ce74';

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
        <span key={video.poster}>
          <img
            onClick={() => handleClick(video)}
            width={200}
            src={myImage}
            alt={`${index + 1}`}
          />
        </span>
      ))}
      <Popup active={isPopup} metadata={PopupData} onClose={handleClosePopup} />
    </div>
  );
}

export default ImageList;
