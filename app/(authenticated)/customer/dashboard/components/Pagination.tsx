"use client"
import { useState } from 'react';

export default function Pagination() {
  const [activePage, setActivePage] = useState(1); // Initial active page

  // Handler to set the clicked page as active
  const handlePageClick = (page: number) => {
    setActivePage(page);
  };

  return (
    <div className="flex justify-between items-center mt-8">
      {/* Previous Button */}
      <button
        className="flex items-center text-gray-500 hover:text-gray-50 transition-colors duration-300"
        onClick={() => activePage > 1 && handlePageClick(activePage - 1)}
      >
        <span className="mr-2">&larr;</span> Prev
      </button>

      {/* Page Numbers */}
      <div className="flex space-x-2">
        {[1, 2, 3,].map((page) => (
          <button
            key={page}
            className={`px-4 py-2 rounded-md shadow-md transition-colors duration-300 ${
              activePage === page
                ? 'bg-[#543310] text-white' // Active page styling
                : 'text-gray-500 hover:text-brown-500' // Inactive page styling
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
        <span className="px-2">...</span>
      </div>

      {/* Next Button */}
      <button
        className="flex items-center text-gray-500 hover:text-brown-500 transition-colors duration-300"
        onClick={() => activePage < 6 && handlePageClick(activePage + 1)}
      >
        Next <span className="ml-2">&rarr;</span>
      </button>
    </div>
  );
}


  