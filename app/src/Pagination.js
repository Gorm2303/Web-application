import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  async function fetchData() {
    try {
      const response = await axios.get(`/api/data?page=${currentPage}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
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
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <button onClick={handlePrevPage}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
}

export default Pagination;