import React, { useState, useEffect } from 'react';

function ImageList({ httpResponse }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(httpResponse)
    setImages(httpResponse);
    
  }, [httpResponse]);

  return (
    <div>
      {images.map((image, index) => (
        <img key={image.poster_path} width={200} src={'https://image.tmdb.org/t/p/original' + image.poster_path} alt={`${index + 1}`} />
      ))}
    </div>
  );
}

export default ImageList;


