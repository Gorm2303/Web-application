import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from './ImageList';

export default function VideoList(props) {
    const [httpResponse, setHttpResponse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log("Could not GET response")
      console.error(error);
    }
  }, [currentPage]);

  async function fetchData() {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=0c2928a0d441bf2ce59630be504699c4&language=en-US&page=${currentPage}`)//'/api/v1/videometadata');
    console.log(response);
    console.log(response.data);
    console.log(response.data.results);
    setHttpResponse(response.data.results);
}

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
      <ImageList httpResponse={httpResponse} />
      <button onClick={handlePrevPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}