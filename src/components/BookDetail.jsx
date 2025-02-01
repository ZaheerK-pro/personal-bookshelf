import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = ({ books }) => {
  const { bookId } = useParams();
  const book = books.find(b => b.key === bookId);

  console.log("Book ID:", bookId);
console.log("Book Data:", book);


  if (!book) {
    return <div className="p-4">Book not found</div>;
  }

  const coverImageUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://via.placeholder.com/300';

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <img src={coverImageUrl} alt={book.title} className="mb-4 rounded" />
      <p className="text-lg">Edition Count: {book.edition_count}</p>
      <p className="mt-4">Details: {book.description || 'No description available.'}</p>
    </div>
  );
};

export default BookDetail;
