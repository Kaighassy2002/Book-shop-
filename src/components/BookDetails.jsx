import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'

function BookDetails({ show, onHide, book, onEdit, onDelete }) {
  if (!book) return null

  return (
    <Modal show={show} onHide={onHide} centered size="lg" animation={true}>
      <Modal.Header closeButton style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '15px 15px 0 0'
      }}>
        <Modal.Title style={{ fontWeight: '600', fontSize: '1.5rem' }}>
          <i className="fa-solid fa-book me-2"></i>
          Book Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)' }}>
        <Row>
          <Col md={4} className="text-center mb-4 mb-md-0">
            <div style={{
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: '20px',
              padding: '1rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)'
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
            >
              <img
                src={book.imgURL || 'https://via.placeholder.com/300x400?text=No+Image'}
                alt={book.bookName}
                className="img-fluid rounded"
                style={{ 
                  maxHeight: '400px', 
                  objectFit: 'cover',
                  width: '100%',
                  borderRadius: '15px'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=No+Image'
                }}
              />
            </div>
          </Col>
          <Col md={8}>
            <h2 className="mb-4" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700',
              fontSize: '2rem'
            }}>{book.bookName}</h2>
            <div className="mb-4 p-3" style={{
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '15px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <h5 className="mb-2" style={{ color: '#667eea', fontWeight: '600' }}>
                <i className="fa-solid fa-user-pen me-2"></i>
                Author
              </h5>
              <p className="fs-5 mb-0 fw-semibold" style={{ color: '#2d3748' }}>{book.authorName}</p>
            </div>
            <div className="mb-4 p-3" style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '15px',
              color: 'white'
            }}>
              <h5 className="mb-2" style={{ fontWeight: '600' }}>
                <i className="fa-solid fa-indian-rupee-sign me-2"></i>
                Price
              </h5>
              <p className="fs-3 fw-bold mb-0">₹{book.price}</p>
            </div>
            <div className="mt-4 p-3" style={{
              background: 'rgba(0, 0, 0, 0.05)',
              borderRadius: '15px',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <p className="mb-0 text-muted">
                <i className="fa-solid fa-info-circle me-2" style={{ color: '#667eea' }}></i>
                Book ID: <strong style={{ color: '#2d3748' }}>{book.id}</strong>
              </p>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer style={{
        border: 'none',
        borderRadius: '0 0 15px 15px',
        background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
      }}>
        <Button 
          variant="secondary" 
          onClick={onHide}
          style={{
            borderRadius: '25px',
            padding: '0.5rem 1.5rem',
            fontWeight: '600',
            border: 'none'
          }}
        >
          Close
        </Button>
        {onEdit && (
          <Button 
            onClick={() => onEdit(book)}
            style={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              border: 'none',
              borderRadius: '25px',
              padding: '0.5rem 1.5rem',
              fontWeight: '600',
              color: 'white',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(250, 112, 154, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <i className="fa-solid fa-edit me-2"></i>
            Edit
          </Button>
        )}
        {onDelete && (
          <Button 
            onClick={() => onDelete(book.id)}
            style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              border: 'none',
              borderRadius: '25px',
              padding: '0.5rem 1.5rem',
              fontWeight: '600',
              color: 'white',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(245, 87, 108, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <i className="fa-solid fa-trash me-2"></i>
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default BookDetails

