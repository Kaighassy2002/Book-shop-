import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='bg-primary  p-4 '>
        <div className=" d-flex justify-content-between">
          <div>
              <Link to={'/'} style={{textDecoration:'none',color:'white',fontWeight:'400'}}>
                  <i className="fa-solid fa-book text-dark fs-2"></i>  Book Shop
              </Link> 
          
          </div >
          <div className="links d-flex flex-column">
                
               <Link to={'/'} style={{textDecoration:'none',color:'white'}}>Landing Page</Link>
               <Link to={'/home'} style={{textDecoration:'none',color:'white'}}>Home Page</Link>
               
              
              </div>
          <div className='me-3 text-secondary' style={{letterSpacing:'12px',fontSize:'20px'}}>
           <a href=""><i className="fa-brands fa-facebook text-secondary"></i></a>
           <a href=""><i className="fa-brands fa-instagram text-secondary"></i></a>
           <a href=""><i className="fa-brands fa-whatsapp text-secondary"></i></a>
           <a href=""><i className="fa-brands fa-twitter text-secondary"></i></a>
         
          </div>
        </div>
        <p className="text-center mt-5 text-secondary">Copyright &copy; 2024 Book Shop. Built with React</p>
  
      </div>
    </>
  )
}

export default Footer
