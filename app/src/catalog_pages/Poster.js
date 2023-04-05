import React, { useState } from 'react';

export default function Poster(props) {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  }

  return (
    <span>
      {imageError ? (
        <img src={'/data/images/imageb65fa080-6d64-41d9-af0c-09007785ce74'} width={200} alt="Fallback poster" />
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
