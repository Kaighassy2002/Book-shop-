import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <>
      <footer className='mt-5 py-5' style={{ marginTop: 'auto', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: '#e0e0e0', borderTop: '1px solid rgba(0, 183, 255, 0.2)' }}>
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <div style={{
                background: 'rgba(0, 183, 255, 0.15)',
                padding: '1.5rem',
                borderRadius: '15px',
                border: '1px solid rgba(0, 183, 255, 0.3)',
                height: '100%'
              }}>
                <h5 className="mb-3" style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  color: '#00b7ff'
                }}>
                  <i className="fa-solid fa-book-open me-2"></i>
                  Book Shop
                </h5>
                <p className="text-secondary mb-0" style={{ lineHeight: '1.8' }}>
                  Your one-stop destination for discovering and managing your favorite books. 
                  Explore our collection and add your own!
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '15px',
                height: '100%'
              }}>
                <h5 className="mb-3" style={{ color: '#00b7ff' }}>
                  <i className="fa-solid fa-link me-2"></i>
                  Quick Links
                </h5>
                <div className="d-flex flex-column">
                  <Link 
                    to={'/'} 
                    className="text-secondary mb-3" 
                    style={{
                      textDecoration:'none',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 183, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.color = '#00d4ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.color = '#b0b0b0';
                    }}
                  >
                    <i className="fa-solid fa-home me-2"></i>Landing Page
                  </Link>
                  <Link 
                    to={'/home'} 
                    className="text-secondary mb-2" 
                    style={{
                      textDecoration:'none',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 183, 255, 0.2)';
                      e.currentTarget.style.transform = 'translateX(10px)';
                      e.currentTarget.style.color = '#00d4ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.color = '#b0b0b0';
                    }}
                  >
                    <i className="fa-solid fa-book me-2"></i>Books Collection
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1.5rem',
                borderRadius: '15px',
                height: '100%'
              }}>
                <h5 className="mb-3" style={{ color: '#00b7ff' }}>
                  <i className="fa-solid fa-share-nodes me-2"></i>
                  Follow Us
                </h5>
                <div className="d-flex gap-3">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-secondary fs-4"
                    style={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #1877f2, #42a5f5)';
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.color = '#6c757d';
                    }}
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-secondary fs-4"
                    style={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)';
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.color = '#6c757d';
                    }}
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a 
                    href="https://whatsapp.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-secondary fs-4"
                    style={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.color = '#6c757d';
                    }}
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-secondary fs-4"
                    style={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #1da1f2, #0d8bd9)';
                      e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.color = '#6c757d';
                    }}
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
          <hr className="my-4" style={{ 
            borderColor: 'rgba(0, 183, 255, 0.3)',
            opacity: 0.5
          }} />
          <p className="text-center text-secondary mb-0" style={{ 
            fontSize: '0.9rem',
            letterSpacing: '0.5px',
            color: '#b0b0b0'
          }}>
            <i className="fa-solid fa-heart me-2" style={{ color: '#00b7ff', animation: 'pulse 2s ease-in-out infinite' }}></i>
            Copyright &copy; {new Date().getFullYear()} Book Shop. Built with 
            <span className="mx-1" style={{ color: '#00b7ff', fontWeight: '600' }}>React</span> & 
            <span className="mx-1" style={{ color: '#00b7ff', fontWeight: '600' }}>Bootstrap</span>
          </p>
          <p className="text-center text-secondary mb-0 mt-3" style={{ 
            fontSize: '0.95rem',
            letterSpacing: '0.5px',
            color: '#b0b0b0'
          }}>
            Made with <span style={{ color: '#00b7ff', animation: 'pulse 2s ease-in-out infinite' }}>❤️</span> by{' '}
            <a 
              href="https://www.kaighassy.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#00b7ff',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00d4ff';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.textShadow = '0 2px 10px rgba(0, 183, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#00b7ff';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              Kaighassy
            </a>
          </p>
        </Container>
      </footer>
    </>
  )
}

export default Footer

