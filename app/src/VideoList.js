import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from './ImageList';

export default function VideoList(props) {
    const [httpResponse, setHttpResponse] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=0c2928a0d441bf2ce59630be504699c4&language=en-US&page=1')//'/api/v1/videometadata');
        setHttpResponse(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <ImageList httpResponse={httpResponse} />
    </div>
  );
}