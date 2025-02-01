import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHome, FaBookOpen, FaUser } from 'react-icons/fa'; // Importing icons

const Header = ({ setSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (query.length > 2) {
      setLoading(true); // Set loading to true when starting the search
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
      const data = await response.json();
      const results = data.docs.map(doc => ({
        key: doc.key,
        title: doc.title,
        edition_count: doc.edition_count,
        cover_i: doc.cover_i // For book images
      }));
      setSearchResults(results);
      setQuery(''); // Clear the search input after submission
      setLoading(false); // Reset loading state
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <FaBookOpen className="mr-2 text-yellow-300" /> My Bookshelf
        </Link>

        {/* Search Bar with Icon */}
        <form onSubmit={handleSearch} className="flex items-center w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="flex-grow p-2 rounded-l-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            style={{ color: 'black' }} // Change text color to black for better visibility
          />
          <button type="submit" className="bg-blue-500 text-white rounded-r-full p-2 hover:bg-blue-600 transition duration-300">
            <FaSearch />
          </button>
        </form>

        {/* Navigation Icons */}
        <nav className="flex items-center space-x-4">
          <Link to="/" className="flex items-center hover:text-yellow-300">
            <FaHome className="mr-1" /> Home
          </Link>
          <Link to="/bookshelf" className="flex items-center hover:text-yellow-300">
            <FaBookOpen className="mr-1" /> Bookshelf
          </Link>
          <Link to="/account" className="flex items-center hover:text-yellow-300">
            <FaUser className="mr-1" /> Account
          </Link>
        </nav>
      </header>

      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
};

export default Header;
