import React, { useState } from 'react';

export default function Poster(props) {
  const [imageError, setImageError] = useState(false);
  const errorImage = require('../noImageAvailable.jpg');

  const handleImageError = () => {
    setImageError(true);
  }

  return (
    <span>
      {imageError ? (
        <img 
        src={errorImage} 
        width={200} 
        alt="Fallback poster" 
        onClick={() => props.onClick(props.video)}
        />
      ) : (
        <img
          onClick={() => props.onClick(props.video)}
          width={250}
          height={375}
          src={props.video.poster}
          alt={props.index + 1} 
          onError={handleImageError} 
        />
      )}
    </span>
  )
}
