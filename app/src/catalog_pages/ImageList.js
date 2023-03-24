import React, { useState, useEffect } from 'react';
import Popup from './Popup';
import Poster from './Poster'

export default function ImageList({ httpResponse }) {
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
          <Poster onClick={handleClick} video={video} index={index}/>
        </span>
      ))}
      <Popup active={isPopup} metadata={PopupData} onClose={handleClosePopup} />
    </div>
  );
}
