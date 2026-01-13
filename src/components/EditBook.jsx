import { Modal, Button, FloatingLabel, Form, Alert } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { updateBookAPI } from "../services/allAPI";

function EditBook({ show, onHide, book, onBookUpdated }) {
  const [editBook, setEditBook] = useState({
    bookName: "",
    authorName: "",
    imgURL: "",
    price: ""
  });
  const [isPrice, setIsPrice] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  useEffect(() => {
    if (book) {
      setEditBook({
        bookName: book.bookName || "",
        authorName: book.authorName || "",
        imgURL: book.imgURL || "",
        price: book.price || ""
      });
      setIsPrice(true);
      setAlert({ show: false, message: "", variant: "" });
    }
  }, [book]);

  const handleClose = () => {
    setEditBook({
      bookName: "",
      authorName: "",
      imgURL: "",
      price: ""
    });
    setIsPrice(true);
    setAlert({ show: false, message: "", variant: "" });
    onHide();
  };

  const handlePriceValue = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d+(\.\d{1,2})?$/;
    const isValidPrice = inputValue === "" || regex.test(inputValue);
    setIsPrice(isValidPrice);
    setEditBook({ ...editBook, price: inputValue });
  };

  const handleUpdate = async () => {
    const { bookName, authorName, imgURL, price } = editBook;
    
    if (!bookName || !authorName || !imgURL || !price) {
      setAlert({ 
        show: true, 
        message: "Please fill all the fields completely!", 
        variant: "danger" 
      });
      return;
    }

    if (!isPrice) {
      setAlert({ 
        show: true, 
        message: "Please enter a valid price!", 
        variant: "danger" 
      });
      return;
    }

    setLoading(true);
    setAlert({ show: false, message: "", variant: "" });

    try {
      const result = await updateBookAPI(book.id, editBook);
      
      if (result?.status >= 200 && result?.status < 300) {
        setAlert({ 
          show: true, 
          message: `Book '${bookName}' updated successfully!`, 
          variant: "success" 
        });
        
        setTimeout(() => {
          handleClose();
          if (onBookUpdated) {
            onBookUpdated();
          }
        }, 1500);
      } else {
        const errorMessage = result?.data?.message || result?.message || "Update failed. Please try again after some time.";
        setAlert({ 
          show: true, 
          message: errorMessage, 
          variant: "danger" 
        });
      }
    } catch (error) {
      setAlert({ 
        show: true, 
        message: error?.message || "An error occurred. Please try again.", 
        variant: "danger" 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!book) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" animation={true}>
      <Modal.Header closeButton style={{
        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '15px 15px 0 0'
      }}>
        <Modal.Title style={{ fontWeight: '600', fontSize: '1.5rem' }}>
          <i className="fa-solid fa-edit me-2"></i>
          Edit Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)' }}>
        {alert.show && (
          <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false, message: "", variant: "" })}
            style={{ borderRadius: '10px', border: 'none' }}>
            {alert.message}
          </Alert>
        )}

        <div className="p-3">
          <FloatingLabel
            controlId="floatingEditBookName"
            label="Book Name"
            className="mb-3"
          >
            <Form.Control
              value={editBook.bookName}
              onChange={(e) =>
                setEditBook({ ...editBook, bookName: e.target.value })
              }
              type="text"
              placeholder="Book Name"
              required
              style={{
                borderRadius: '10px',
                border: '2px solid #e0e0e0',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
                e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingEditAuthorName"
            label="Author Name"
            className="mb-3"
          >
            <Form.Control
              value={editBook.authorName}
              onChange={(e) =>
                setEditBook({ ...editBook, authorName: e.target.value })
              }
              type="text"
              placeholder="Author Name"
              required
              style={{
                borderRadius: '10px',
                border: '2px solid #e0e0e0',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
                e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingEditImgURL"
            label="Image URL"
            className="mb-3"
          >
            <Form.Control
              value={editBook.imgURL}
              onChange={(e) =>
                setEditBook({ ...editBook, imgURL: e.target.value })
              }
              type="url"
              placeholder="Image URL"
              required
              style={{
                borderRadius: '10px',
                border: '2px solid #e0e0e0',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
                e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0'
                e.target.style.boxShadow = 'none'
              }}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingEditPrice"
            label="Price (₹)"
            className="mb-3"
          >
            <Form.Control
              value={editBook.price}
              onChange={handlePriceValue}
              type="text"
              placeholder="Price"
              required
              isInvalid={!isPrice}
              style={{
                borderRadius: '10px',
                border: '2px solid #e0e0e0',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
                e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0'
                e.target.style.boxShadow = 'none'
              }}
            />
            {!isPrice && (
              <Form.Control.Feedback type="invalid">
                Please enter a valid price (e.g., 299.99)
              </Form.Control.Feedback>
            )}
          </FloatingLabel>
        </div>
      </Modal.Body>
      <Modal.Footer style={{
        border: 'none',
        borderRadius: '0 0 15px 15px',
        background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
      }}>
        <Button 
          variant="secondary" 
          onClick={handleClose} 
          disabled={loading}
          style={{
            borderRadius: '25px',
            padding: '0.5rem 1.5rem',
            fontWeight: '600',
            border: 'none'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleUpdate} 
          disabled={loading}
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
            if (!loading) {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(250, 112, 154, 0.4)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Updating...
            </>
          ) : (
            <>
              <i className="fa-solid fa-save me-2"></i>
              Update Book
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditBook;

