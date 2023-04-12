import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import VideoList from './VideoList';

export default function CatalogPage() {
  const [httpResponse, setHttpResponse] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const accessToken = sessionStorage.getItem('access_token');

  const fetchData = useCallback(async (token, params) => {
    try {
      const searchQuery = params.get('q');
      const endpoint = searchQuery
        ? `${process.env.REACT_APP_VIDEOMETADATA_URL}/search?q=${searchQuery}`
        : process.env.REACT_APP_VIDEOMETADATA_URL;
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setHttpResponse(response);
    } catch (error) {
      setError(error);
    }
  }, []);
  
  useEffect(() => {
    fetchData(accessToken, searchParams);
  }, [fetchData, accessToken, searchParams]);
  

  return (
    <div>
      <h1>Catalog</h1>
      <VideoList httpResponse={httpResponse} error={error} />
    </div>
  );
}
