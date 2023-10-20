// import React, { useState, useEffect } from 'react';

// const itemsPerPage = 10;

// const App = () => {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

  

//   useEffect(() => {
//     fetchData();
//   }, [page]);

//   const fetchData = () => {
//     if (!hasMore) return;

//     setIsLoading(true);

//     // Replace 'your-api-url' with your API endpoint
//     fetch(`https://jsonplaceholder.typicode.com/users?_page=1&_limit=10`)
//       .then((response) => response.json())
//       .then((newData) => {
//         setData((prevData) => [...prevData, ...newData]);
//         setIsLoading(false);

//         // Adjust 'itemsPerPage' based on your API response
//         if (newData.length < itemsPerPage) {
//           setHasMore(false);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setIsLoading(false);
//       });
//   };

//   const loadMore = () => {
//     setPage(page + 1);
//   };

//   return (
//     <div>
//       <ul>
//         {data.map((item, index) => (
//           <li key={index}>{item.name /* Replace with your data properties */}</li>
//         ))}
//       </ul>

//       {isLoading && <p>Loading...</p>}
//       {hasMore && !isLoading && <button onClick={loadMore}>Load More</button>}
//     </div>
//   );
// };

// export default App;





import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
// import items from './items';
 // Your list of items to paginate



const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([])
  const itemsPerPage = 10; // Number of items to display per page

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Implement logic to fetch and display data for the selected page
    const apiUrl = `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&_limit=10`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Assuming the API response contains an array of items
      setItems(data);
    })
    .catch((error) => {
      // Handle errors, e.g., show an error message to the user
      console.error("Error fetching data: ", error);
    });
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    onPageChange(currentPage);
  }, [currentPage]);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {/* Render your items */}
      {items.map((item) => (
        // Render your item component here
        <div key={item.id}>{item.title}</div>
      ))}

      {/* Render pagination component */}
      <Pagination totalItems={100} itemsPerPage={itemsPerPage} onPageChange={onPageChange} />
    </div>
  );
};

export default App;

