import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = () => {
    if (!hasMore) return;

    setIsLoading(true);

    // Replace 'your-api-url' with your API endpoint
    fetch(`your-api-url?page=${page}`)
      .then((response) => response.json())
      .then((newData) => {
        setData((prevData) => [...prevData, ...newData]);
        setIsLoading(false);

        // Adjust 'itemsPerPage' based on your API response
        if (newData.length < itemsPerPage) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name /* Replace with your data properties */}</li>
        ))}
      </ul>

      {isLoading && <p>Loading...</p>}
      {hasMore && !isLoading && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};

export default App;
