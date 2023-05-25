import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoList from './VideoList';

export default function CatalogPage() {
  const [httpResponse, setHttpResponse] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const accessToken = sessionStorage.getItem('access_token');
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const searchQuery = searchParams.get('q');
      const endpoint = searchQuery
        ? `${process.env.REACT_APP_CACHER_VIDEOMETADATA_URL}/search?q=${searchQuery}`
        : process.env.REACT_APP_CACHER_VIDEOMETADATA_URL;
        
      let headers = {};
      if (accessToken) {
        headers = {
          Authorization: `Bearer ${accessToken}`,
        };
      }
      
      const response = await axios.get(endpoint, { headers });

      setHttpResponse(response);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else if (error.response && error.response.status === 403) {
        navigate('/subscription');
      } else {
        setError(error);
      }
    }
  }, [accessToken, searchParams, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <h1>Catalog</h1>
      <VideoList httpResponse={httpResponse} error={error} />
    </div>
  );
}



