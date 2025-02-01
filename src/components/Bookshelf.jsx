import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // Importing an icon for the button

const Bookshelf = ({ bookshelf }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookshelf</h2>
      
      {bookshelf.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg mb-2">Your bookshelf is empty!</h3>
          <Link to="/" className="bg-blue-500 text-white rounded px-4 py-2 flex items-center transition duration-300 hover:bg-blue-600">
            <FaPlus className="mr-2" /> Add Books to Bookshelf
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookshelf.map(book => {
            const coverImageUrl = book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : 'https://via.placeholder.com/150';
            
            return (
              <div key={book.key} className="book-card p-4 border border-gray-300 rounded shadow-md flex flex-col items-center">
                <img src={coverImageUrl} alt={book.title} className="mb-2 rounded" style={{ maxWidth: '100%', height: 'auto' }} />
                <h3 className="text-lg font-semibold">Book Title: {book.title}</h3>
                <p>Edition Count: {book.edition_count}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
