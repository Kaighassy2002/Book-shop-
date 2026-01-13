import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, Form, InputGroup } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

function Header({ onSearch }) {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    if (onSearch) {
      onSearch('')
    }
  }

  return (
    <>
      <Navbar 
        expand="lg" 
        fixed="top"
        className="cinematic-navbar"
        style={{
          background: isScrolled 
            ? 'rgba(26, 26, 46, 0.85)' 
            : 'rgba(26, 26, 46, 0.4)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: isScrolled 
            ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
            : 'none',
          borderBottom: isScrolled 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: isScrolled ? '0.75rem 0' : '1.5rem 0',
          zIndex: 1000
        }}
      >
        <Container>
          <Navbar.Brand>
            <Link 
              to={'/'} 
              className="cinematic-brand"
              style={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: '800',
                fontSize: isScrolled ? '1.5rem' : '1.8rem',
                display: 'flex',
                alignItems: 'center',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                letterSpacing: '-0.02em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.textShadow = '0 0 30px rgba(255, 215, 0, 0.8)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.5)'
              }}
            >
              <i 
                className="fa-solid fa-book-open me-2" 
                style={{ 
                  color: '#ffd700',
                  filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))',
                  animation: 'pulse 2s ease-in-out infinite',
                  transform: `rotateY(${scrollY * 0.1}deg)`
                }}
              ></i>
              BOOK SHOP
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            style={{ 
              borderColor: 'rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)'
            }} 
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-4">
              <Link 
                to={'/'} 
                className="cinematic-nav-link"
                style={{
                  textDecoration: 'none',
                  color: location.pathname === '/' ? '#ffd700' : 'rgba(255, 255, 255, 0.8)',
                  fontWeight: location.pathname === '/' ? '700' : '400',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '30px',
                  margin: '0 0.3rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: location.pathname === '/' 
                    ? 'rgba(255, 215, 0, 0.15)' 
                    : 'transparent',
                  backdropFilter: 'blur(10px)',
                  border: location.pathname === '/' 
                    ? '1px solid rgba(255, 215, 0, 0.3)' 
                    : '1px solid transparent',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.color = '#ffd700'
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/') {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }
                }}
              >
                <i className="fa-solid fa-home me-2"></i>Home
              </Link>
              <Link 
                to={'/home'} 
                className="cinematic-nav-link"
                style={{
                  textDecoration: 'none',
                  color: location.pathname === '/home' ? '#ffd700' : 'rgba(255, 255, 255, 0.8)',
                  fontWeight: location.pathname === '/home' ? '700' : '400',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '30px',
                  margin: '0 0.3rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: location.pathname === '/home' 
                    ? 'rgba(255, 215, 0, 0.15)' 
                    : 'transparent',
                  backdropFilter: 'blur(10px)',
                  border: location.pathname === '/home' 
                    ? '1px solid rgba(255, 215, 0, 0.3)' 
                    : '1px solid transparent',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/home') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.color = '#ffd700'
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/home') {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  }
                }}
              >
                <i className="fa-solid fa-book me-2"></i>Books
              </Link>
            </Nav>
            {location.pathname === '/home' && (
              <Form className="d-flex">
                <InputGroup 
                  className="cinematic-search"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '30px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.5)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 215, 0, 0.3)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <InputGroup.Text style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.9)',
                    padding: '0.75rem 1.2rem'
                  }}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    placeholder="Search books or authors..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'white',
                      minWidth: '250px',
                      padding: '0.75rem 1rem'
                    }}
                    className="search-input-cinematic"
                  />
                  {searchTerm && (
                    <InputGroup.Text 
                      onClick={handleClearSearch}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.8)',
                        cursor: 'pointer',
                        padding: '0.75rem 1rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ffd700'
                        e.currentTarget.style.transform = 'scale(1.2) rotate(90deg)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                      }}
                    >
                      <i className="fa-solid fa-times"></i>
                    </InputGroup.Text>
                  )}
                </InputGroup>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
