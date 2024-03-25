import React from 'react'

import { useNavigate } from 'react-router-dom';
function LandingPage() {
  const navgate =useNavigate();

  const handleNavigate = ()=>{
    navgate("/home");
  }
  return (
    <>
      <div className=" header ">
      <div className="   container ">
          <div className="d-flex align-items-center justify-content-center flex-column mt-5 mb-5">
            <h3 className='mt-4'>
              Welcome to <span className="text-info">Book Shop</span>
            </h3>
            <p className="mt-3 ps-5 pe-5" style={{ textAlign: "justify" }}>
            There are countless books covering a wide range of topics. Could you please specify what area or topic you're interested in? That way, I can recommend some relevant books for you.
            </p>
            <button onClick={handleNavigate} className="btn btn-info mt-3">
              Get Started
            </button>
          </div>
         
        </div>
       
      </div>
    </>
  )
}

export default LandingPage
