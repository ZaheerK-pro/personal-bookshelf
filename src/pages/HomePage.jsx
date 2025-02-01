import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaBookReader } from 'react-icons/fa'; // Animated reading icon from react-icons

const HomePage = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  const handleSearchResults = (results) => {
    setLoading(true); // Start loading animation
    setTimeout(() => {
      setSearchResults(results);
      setLoading(false); // Stop loading once books are fetched
    }, 1000); // Simulate delay for demonstration
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header setSearchResults={handleSearchResults} />
      <div className="flex-grow p-4">
        {/* Show animation if no books are loaded and not searching */}
        {loading || searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {searchResults.length > 0 ? (
              searchResults.map((book) => (
                <BookCard key={book.key} book={book} addToBookshelf={addToBookshelf} />
              ))
            ) : (
              <p className="text-center">No books found. Try searching for something else!</p>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            {/* Animated icon for reading books */}
            <FaBookReader className="text-8xl text-blue-600 animate-pulse" />
            <p className="text-center text-2xl ml-4">Search for your favorite books!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
