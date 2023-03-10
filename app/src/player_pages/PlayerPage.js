import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';

export default function PlayerPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoUrl = searchParams.get('url');

  return (
    <div>
      <VideoPlayer url={videoUrl} />
    </div>
  )
}