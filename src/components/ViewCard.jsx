import React, { useEffect, useState, useCallback, useRef } from "react";
import { Card, Container, Row, Col, Button, Spinner, Alert, Form, Badge } from "react-bootstrap";
import { getAllBookAPI, removeBookAPI } from "../services/allAPI";
import BookDetails from "./BookDetails";
import EditBook from "./EditBook";

function ViewCard({ refreshTrigger, searchTerm = "", onBooksLoaded }) {
  const [allBooksCard, setAllBooksCard] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [filterPrice, setFilterPrice] = useState("all");
  const isRequestInProgress = useRef(false);

  const getAllBookDetails = useCallback(async () => {
    // Prevent duplicate simultaneous requests
    if (isRequestInProgress.current) {
      return;
    }
    
    isRequestInProgress.current = true;
    setLoading(true);
    setError(null);
    try {
      const result = await getAllBookAPI();
      if (result?.status === 200 && Array.isArray(result?.data)) {
        const books = result.data;
        setAllBooksCard(books);
        if (onBooksLoaded) {
          onBooksLoaded(books);
        }
      } else {
        setError(result?.data?.message || "Failed to load books. Please try again later.");
      }
    } catch (err) {
      setError(err?.message || "An error occurred while loading books.");
    } finally {
      setLoading(false);
      isRequestInProgress.current = false;
    }
  }, [onBooksLoaded]);

  useEffect(() => {
    getAllBookDetails();
  }, [refreshTrigger, getAllBookDetails]);

  useEffect(() => {
    let filtered = [...allBooksCard];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.bookName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.authorName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price filter
    if (filterPrice !== "all") {
      filtered = filtered.filter((book) => {
        const price = parseFloat(book.price || 0);
        switch (filterPrice) {
          case "low":
            return price < 500;
          case "medium":
            return price >= 500 && price < 1000;
          case "high":
            return price >= 1000;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.bookName || "").localeCompare(b.bookName || "");
        case "author":
          return (a.authorName || "").localeCompare(b.authorName || "");
        case "price-low":
          return parseFloat(a.price || 0) - parseFloat(b.price || 0);
        case "price-high":
          return parseFloat(b.price || 0) - parseFloat(a.price || 0);
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  }, [allBooksCard, searchTerm, sortBy, filterPrice]);

  const deleteBook = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const result = await removeBookAPI(bookId);
        if (result?.status === 200 || result?.status === 204) {
          getAllBookDetails();
          setShowDetails(false);
        } else {
          alert("Failed to delete book. Please try again.");
        }
      } catch (err) {
        alert("Failed to delete book. Please try again.");
      }
    }
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setShowDetails(true);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowDetails(false);
    setShowEdit(true);
  };

  const handleBookUpdated = () => {
    getAllBookDetails();
    setShowEdit(false);
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <Container className="text-center my-5 py-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Loading books...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Container className="my-5">
        {allBooksCard?.length > 0 && (
          <div className="mb-4">
            <Row className="g-3 align-items-end">
              <Col md={4}>
                <Form.Label>
                  <i className="fa-solid fa-filter me-2"></i>
                  Filter by Price
                </Form.Label>
                <Form.Select
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under ₹500</option>
                  <option value="medium">₹500 - ₹1000</option>
                  <option value="high">Above ₹1000</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Label>
                  <i className="fa-solid fa-sort me-2"></i>
                  Sort By
                </Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Book Name (A-Z)</option>
                  <option value="author">Author Name (A-Z)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <div className="text-muted">
                  Showing <strong>{filteredBooks.length}</strong> of <strong>{allBooksCard.length}</strong> books
                </div>
              </Col>
            </Row>
          </div>
        )}

        {filteredBooks?.length > 0 ? (
          <div 
            className="cinematic-grid-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2.5rem',
              padding: '2rem 0',
              perspective: '1000px'
            }}
          >
            {filteredBooks.map((book, index) => (
              <div
                key={book.id}
                className="cinematic-book-card"
                data-index={index}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: 0,
                  transform: 'translateY(50px) rotateX(10deg)',
                  animation: `revealCard 0.8s ease-out ${index * 0.1}s forwards`
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  e.currentTarget.style.transform = `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                  e.currentTarget.style.boxShadow = '0 30px 60px rgba(102, 126, 234, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)';
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 15;
                  const rotateY = (centerX - x) / 15;
                  e.currentTarget.style.transform = `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
                }}
              >
                <Card className="h-100 border-0" style={{
                  borderRadius: '25px',
                  overflow: 'hidden',
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  height: '100%'
                }}
                >
                  <div 
                    className="position-relative overflow-hidden cursor-pointer" 
                    style={{ 
                      height: '320px', 
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleViewDetails(book)}
                  >
                    <Card.Img
                      variant="top"
                      src={book?.imgURL || 'https://via.placeholder.com/300x400?text=No+Image'}
                      alt={book?.bookName}
                      className="h-100 w-100"
                      style={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                      }}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteBook(book.id);
                        }}
                        className="rounded-circle"
                        style={{ 
                          width: '40px', 
                          height: '40px',
                          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                          border: 'none',
                          boxShadow: '0 4px 15px rgba(245, 87, 108, 0.4)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 87, 108, 0.6)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 87, 108, 0.4)'
                        }}
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </div>
                    <div className="position-absolute top-0 start-0 m-3">
                      <Badge className="px-3 py-2" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                      }}>
                        <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                        {book?.price}
                      </Badge>
                    </div>
                    <div className="position-absolute bottom-0 start-0 end-0 p-3" style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0'
                    }}
                    >
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column p-4">
                    <Card.Title 
                      className="text-truncate cursor-pointer mb-2" 
                      title={book?.bookName}
                      onClick={() => handleViewDetails(book)}
                      style={{ 
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#2d3748',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#667eea'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#2d3748'
                      }}
                    >
                      {book?.bookName}
                    </Card.Title>
                    <Card.Subtitle className="mb-3" style={{ 
                      color: '#718096',
                      fontSize: '0.95rem',
                      fontWeight: '500'
                    }}>
                      <i className="fa-solid fa-user-pen me-2" style={{ color: '#667eea' }}></i>
                      {book?.authorName}
                    </Card.Subtitle>
                    <div className="mt-auto">
                      <div className="d-flex gap-2">
                        <Button
                          size="sm"
                          className="flex-fill"
                          onClick={() => handleViewDetails(book)}
                          style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            fontWeight: '600',
                            padding: '0.5rem',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <i className="fa-solid fa-eye me-1"></i>
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="flex-fill"
                          onClick={() => handleEdit(book)}
                          style={{
                            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            fontWeight: '600',
                            padding: '0.5rem',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(250, 112, 154, 0.4)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <i className="fa-solid fa-edit me-1"></i>
                          Edit
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        ) : allBooksCard?.length > 0 ? (
          <div className="text-center my-5 py-5">
            <i className="fa-solid fa-search fa-4x text-muted mb-3"></i>
            <h4 className="text-muted">No Books Found</h4>
            <p className="text-muted">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="text-center my-5 py-5">
            <i className="fa-solid fa-book-open fa-4x text-muted mb-3"></i>
            <h4 className="text-muted">No Books Available</h4>
            <p className="text-muted">Start by adding your first book!</p>
          </div>
        )}
      </Container>

      <BookDetails
        show={showDetails}
        onHide={() => {
          setShowDetails(false);
          setSelectedBook(null);
        }}
        book={selectedBook}
        onEdit={handleEdit}
        onDelete={deleteBook}
      />

      <EditBook
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
          setSelectedBook(null);
        }}
        book={selectedBook}
        onBookUpdated={handleBookUpdated}
      />
    </>
  );
}

export default ViewCard;
