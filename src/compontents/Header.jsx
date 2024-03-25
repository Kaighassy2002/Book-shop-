import React from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >
            <Link to={'/'} style={{textDecoration:'none',color:'white',fontWeight:'400'}}>
            <i className="fa-solid fa-book text-dark fs-2"></i>  Book Shop
            </Link> 
            
         </Navbar.Brand>
          
        </Container>
      </Navbar>
    </>
  )
}

export default Header
