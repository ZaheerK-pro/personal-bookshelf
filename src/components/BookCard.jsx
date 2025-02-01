import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, addToBookshelf }) => {
  const coverImageUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/150';

  return (
    <div className="book-card p-4 border border-gray-300 rounded shadow-md flex flex-col items-center">
      <Link to={`/book/${book.key}`} className="flex flex-col items-center">
        <img src={coverImageUrl} alt={book.title} className="mb-2 rounded" />
        <h3 className="text-lg font-semibold">Book Title: {book.title}</h3>
      </Link>
      <p>Edition Count: {book.edition_count}</p>
      <button onClick={() => addToBookshelf(book)} className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-300">
        Add to Bookshelf
      </button>
    </div>
  );
};

export default BookCard;
