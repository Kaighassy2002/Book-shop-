import { Modal, Button, FloatingLabel, Form, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { uploadBooks } from "../services/allAPI";

function Add({ onBookAdded }) {
  const [addbook, setaddbook] = useState({
    bookName: "",
    authorName: "",
    imgURL: "",
    price: ""
  });
  const [show, setShow] = useState(false);
  const [isPrice, setIsPrice] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  const handleClose = () => {
    setShow(false);
    setaddbook({
      bookName: "",
      authorName: "",
      imgURL: "",
      price: ""
    });
    setIsPrice(true);
    setAlert({ show: false, message: "", variant: "" });
  };

  const handleShow = () => setShow(true);

  const handlePriceValue = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d+(\.\d{1,2})?$/;
    const isValidPrice = inputValue === "" || regex.test(inputValue);
    setIsPrice(isValidPrice);
    setaddbook({ ...addbook, price: inputValue });
  };

  const handleUpload = async () => {
    const { bookName, authorName, imgURL, price } = addbook;
    
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
      const result = await uploadBooks(addbook);
      
      if (result?.status >= 200 && result?.status < 300) {
        setAlert({ 
          show: true, 
          message: `Book '${result.data?.bookName || bookName}' uploaded successfully!`, 
          variant: "success" 
        });
        
        setTimeout(() => {
          handleClose();
          if (onBookAdded) {
            onBookAdded();
          }
        }, 1500);
      } else {
        const errorMessage = result?.data?.message || result?.message || "API call failed. Please try again after some time.";
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

  return (
    <>
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2 className="mb-1" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: '700',
              fontSize: '2rem'
            }}>
              <i className="fa-solid fa-book me-2" style={{ color: '#667eea' }}></i>
              Book Collection
            </h2>
            <p className="text-muted mb-0">Manage your personal library</p>
          </div>
          <button
            className="btn btn-lg shadow-lg"
            onClick={handleShow}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontWeight: '600',
              padding: '0.75rem 2rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)'
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)'
            }}
          >
            <i className="fa-solid fa-plus me-2"></i>
            Add New Book
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered size="lg" animation={true}>
        <Modal.Header closeButton style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '15px 15px 0 0'
        }}>
          <Modal.Title style={{ fontWeight: '600', fontSize: '1.5rem' }}>
            <i className="fa-solid fa-book me-2"></i>
            Add New Book
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
              controlId="floatingBookName"
              label="Book Name"
              className="mb-3"
            >
              <Form.Control
                value={addbook.bookName}
                onChange={(e) =>
                  setaddbook({ ...addbook, bookName: e.target.value })
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
              controlId="floatingAuthorName"
              label="Author Name"
              className="mb-3"
            >
              <Form.Control
                value={addbook.authorName}
                onChange={(e) =>
                  setaddbook({ ...addbook, authorName: e.target.value })
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
              controlId="floatingImgURL"
              label="Image URL"
              className="mb-3"
            >
              <Form.Control
                value={addbook.imgURL}
                onChange={(e) =>
                  setaddbook({ ...addbook, imgURL: e.target.value })
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
              controlId="floatingPrice"
              label="Price (₹)"
              className="mb-3"
            >
              <Form.Control
                value={addbook.price}
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
            onClick={handleUpload} 
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '25px',
              padding: '0.5rem 1.5rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)'
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
                Adding...
              </>
            ) : (
              <>
                <i className="fa-solid fa-upload me-2"></i>
                Add Book
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;

