import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import VideoList from './VideoList';

export default function CatalogPage() {
  const [httpResponse, setHttpResponse] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const searchQuery = searchParams.get('q');
        const endpoint = searchQuery
          ? `${process.env.VIDEOMETADATA_URL}/search?q=${searchQuery}`
          : process.env.VIDEOMETADATA_URL;
        const response = await axios.get(endpoint);
        setHttpResponse(response);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [searchParams]);

  return (
    <div>
      <h1>Catalog</h1>
      <VideoList httpResponse={httpResponse} error={error} />
    </div>
  );
}