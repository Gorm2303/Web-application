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
        <img src={errorImage} width={200} alt="Fallback poster" />
      ) : (
        <img
          onClick={() => props.onClick(props.video)}
          width={200}
          src={props.video.poster}
          alt={props.index + 1} 
          onError={handleImageError} 
        />
      )}
    </span>
  )
}
