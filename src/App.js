import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookshelfPage from './pages/BookshelfPage';
import BookDetail from './components/BookDetail';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setSearchResults={setSearchResults} />} />
        <Route path="/bookshelf" element={<BookshelfPage bookshelf={searchResults} />} />
        <Route path="/book/:bookId" element={<BookDetail books={searchResults} />} />

      </Routes>
    </Router>
  );
}

export default App;
