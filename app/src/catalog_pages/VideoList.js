import React, { useState } from 'react';
import ImageList from './ImageList';
import { Alert } from 'react-bootstrap';

export default function VideoList({ httpResponse, error }) {
  const [currentPage, setCurrentPage] = useState(1);

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
        <Alert variant="danger">
          {error.response && error.response.data.msg
            ? `Error ${error.response.status}: ${error.response.data.msg}`
            : "Could not fetch data."}
        </Alert>
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
