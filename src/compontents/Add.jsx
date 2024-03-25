import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import React, { useState } from "react";
import { uploadBooks } from "../serveses/allAPI";

function Add() {
  const [addbook, setaddbook] = useState({
    bookName: "",
    authorName: "",
    imgURL: "",
    
    price: ""
  });
  const [show, setShow] = useState(false);
  const [isPrice, setIsPrice] = useState(true);

  const handleClose = () => {
    setShow(false);
    setaddbook({
      ...addbook,
      bookName: "",
      authorName: "",
      imgURL: "",
      
      price: ""
    });
  };
  const handleShow = () => setShow(true);

  const handlePriceValue = (e) => {
    const inputValue = e.target.value;
    const regex = /^\d+(\.\d{1,2})?$/;
    const isValidPrice = inputValue === "" || regex.test(inputValue);
    setIsPrice(isValidPrice);
    setaddbook({ ...addbook, price: inputValue });

    // console.log(addbook);
  };

  const handleUpload = async () => {
    const { bookName, authorName, imgURL, price } = addbook;
    if (bookName && authorName && imgURL && price ) {
      const result = await uploadBooks(addbook)
      console.log(result);
      if (result.status>=200 && result.status<300) {
        alert(`Boook '${result.data.caption}'uploaded successfully!!!`)
        
        handleClose()
      }else{
        
        alert("API Call FAiled... PLease try after some time")
      }
    } else {
      alert("Please fill the form Completely!!!");
    }
  };
  return (
    <>
      <div>
        <h4 className="ms-3">
          
          <button
            className="btn border rounded btn-outline-warning  "
            style={{fontSize:'15px'}}
            variant="primary"
            onClick={handleShow}
          >
          Add books{" "} 
          <i className="fa-solid fa-upload"></i>
          </button>
        </h4>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          
          <Modal.Title>Add Books</Modal.Title>
        </Modal.Header>
        <Modal.Body>

         
          <div className="border rounded border-secondary p-3">
         
   
            <FloatingLabel
              controlId="floatingInputCaption"
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
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInputCaption"
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
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInputImg"
              label="Image Url"
              className="mb-3"
            >
              <Form.Control
                value={addbook.imgURL}
                onChange={(e) =>
                  setaddbook({ ...addbook, imgURL: e.target.value })
                }
                type="text"
                placeholder="Image Url"
              />
            </FloatingLabel>

         
            <FloatingLabel
              controlId="floatingInputLink"
              label=" Price"
              className="mb-3"
            >
              <Form.Control
                value={addbook.price}
                onChange={handlePriceValue}
                type="text"
                placeholder="Price"
              />
              {!isPrice && (
                <Form.Text className="text-danger">Invalid price</Form.Text>
              )}
            </FloatingLabel>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
