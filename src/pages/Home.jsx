import React, { useState, useCallback } from 'react'
import Add from '../components/Add'
import ViewCard from '../components/ViewCard'
import Statistics from '../components/Statistics'
import { Container } from 'react-bootstrap'

function Home({ searchTerm = '' }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [allBooks, setAllBooks] = useState([]);

  const handleBookAdded = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const handleBooksLoaded = useCallback((books) => {
    setAllBooks(books);
  }, []);

  return (
    <>
      <div className="hero-section mt-5 mb-5">
        <Container>
          <div className="text-center py-5">
            <h1 className="display-5 fw-bold mb-3">
              <i className="fa-solid fa-book-open me-2 text-primary"></i>
              Explore Our Book Collection
            </h1>
            <p className="lead text-muted">
              Discover amazing books and manage your personal library
            </p>
          </div>
        </Container>
      </div>
      
      <Add onBookAdded={handleBookAdded} />
      
      <Statistics books={allBooks} />
      
      <ViewCard 
        refreshTrigger={refreshTrigger} 
        searchTerm={searchTerm}
        onBooksLoaded={handleBooksLoaded}
      />
    </>
  )
}

export default Home
