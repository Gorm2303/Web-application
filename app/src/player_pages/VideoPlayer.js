import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }) => {
  return (
    <div>
      <ReactPlayer 
      url={url} 
      width='100%' 
      height='95vh' 
      controls
      config={{ file: { 
        attributes: {
          controlsList: "nodownload",
          autoplay: "true",
        }
      }}}
      
      
      />
    </div>
  );
};

export default VideoPlayer;
