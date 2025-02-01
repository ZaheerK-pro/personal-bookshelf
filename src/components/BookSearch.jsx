import React, { useState } from 'react';
import BookCard from './BookCard';

const BookSearch = ({ addToBookshelf }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    const query = event.target.value;
    setQuery(query);

    if (query.length > 2) {
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
      const data = await response.json();
      setResults(data.docs.map(doc => ({
        key: doc.key,
        title: doc.title,
        edition_count: doc.edition_count,
        cover_i: doc.cover_i // Added for image fetching
      })));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for books..."
        className="w-full p-2 border rounded shadow-sm"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {results.map(book => (
          <BookCard key={book.key} book={book} addToBookshelf={addToBookshelf} />
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
