import React, { useEffect, useState } from "react";

import { getAllBookAPI, removeBookAPI } from "../serveses/allAPI";

function ViewCard() {
  const [allBooksCard, setAllBooksCard] = useState([]);
  const getAllBookDetails = async () => {
    const result = await getAllBookAPI();

    if (result?.status == 200) {
      setAllBooksCard(result?.data);
    }
  };

  useEffect(() => {
    getAllBookDetails();
  }, []);
  console.log(allBooksCard);

  const deletBook = async(bID)=>{
     await removeBookAPI(bID)
    getAllBookDetails()
  }
  return (
    <>
      <div className="container mb-3 mt-4 ">
      { allBooksCard?.length>0? allBooksCard?.map((book,index)=>(

        <div className=" mt-2 row mb-5  ">
          <div className="col-lg-2">

          </div>
          <div className="col-lg-4">
          <img className="border rounded p-3" src={book?.imgURL} height={"200px"} alt="" />
          </div>
          <div className="col-lg-4">
          <h6>{book?.authorName}</h6>
            <h4>{book?.bookName}</h4>
            <p>₹ {book?.price}</p>
            <button onClick={()=>deletBook(book.id)} className="btn text-end btn-danger rounded">
                delete
              </button>
          </div>
          
          
        </div>
        
       ))
      
       :
       <div>No Books !!!</div>  
       }

      </div>
    </>
  );
}

export default ViewCard;
