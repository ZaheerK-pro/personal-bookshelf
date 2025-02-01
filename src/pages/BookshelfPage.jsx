import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Toaster from '../components/Toaster';
import { FiTrash2 } from 'react-icons/fi';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState('');

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const removeBook = (bookKey) => {
    const updatedBookshelf = bookshelf.filter(book => book.key !== bookKey);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    setToasterMessage('Book removed from bookshelf!');
    setShowToaster(true);
    setTimeout(() => setShowToaster(false), 3000);
  };

  const confirmRemove = (bookKey) => {
    const confirmed = window.confirm('Are you sure you want to remove this book from your bookshelf?');
    if (confirmed) {
      removeBook(bookKey);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
        <Link to="/" className="text-2xl font-bold">📚 My Bookshelf</Link>
        <Link to="/" className="text-sm hover:underline">Back to Search</Link>
      </header>

      <div className="flex-grow p-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Bookshelf</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bookshelf.length > 0 ? (
            bookshelf.map((book) => (
              <div key={book.key} className="book-card bg-white shadow-lg p-4 rounded relative">
                {book.cover_i ? (
                  <img
                    src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                    alt={`${book.title} cover`}
                    className="w-full h-48 object-cover mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 mb-4 flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
                <h3 className="text-lg font-bold mb-2">Title: {book.title}</h3>
                <p className="text-sm mb-2">Edition Count: {book.edition_count}</p>
                <button
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  onClick={() => confirmRemove(book.key)}
                >
                  <FiTrash2 size={24} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center">No books in your bookshelf yet.</p>
          )}
        </div>
      </div>

      {showToaster && <Toaster message={toasterMessage} />}
      <Footer />
    </div>
  );
};

export default BookshelfPage;
