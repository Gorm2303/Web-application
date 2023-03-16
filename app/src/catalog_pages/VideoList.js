import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from './ImageList';

export default function VideoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [httpResponse, setHttpResponse] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(process.env.REACT_APP_CACHER_VIDEOMETADATA_URL);
        console.log(response);
        setHttpResponse(response);
      } catch (error) {
        console.log("Could not GET response in VideoList")
        setError(error);
      }
    }

    fetchData();
  }, [currentPage]);

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div>
      {error ? (
        <div>Could not fetch data.</div>
      ) : httpResponse.status === 200 ? (
        <div>
          <ImageList httpResponse={httpResponse.data} />
          <button onClick={handlePrevPage}>Previous</button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
