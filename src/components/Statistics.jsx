import React from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap'

function Statistics({ books }) {
  const totalBooks = books?.length || 0
  const totalValue = books?.reduce((sum, book) => sum + parseFloat(book.price || 0), 0) || 0
  const averagePrice = totalBooks > 0 ? (totalValue / totalBooks).toFixed(2) : 0
  const uniqueAuthors = new Set(books?.map(book => book.authorName)).size || 0

  const stats = [
    {
      title: 'Total Books',
      value: totalBooks,
      icon: 'fa-book',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Total Value',
      value: `₹${totalValue.toFixed(2)}`,
      icon: 'fa-indian-rupee-sign',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      iconBg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Average Price',
      value: `₹${averagePrice}`,
      icon: 'fa-chart-line',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      iconBg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Unique Authors',
      value: uniqueAuthors,
      icon: 'fa-user-pen',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      iconBg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    }
  ]

  return (
    <Container className="my-5 cinematic-stats-container">
      <div 
        className="stats-grid-asymmetric"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          position: 'relative'
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="cinematic-stat-card"
            style={{
              opacity: 0,
              transform: `translateY(50px) rotateX(${index % 2 === 0 ? '10deg' : '-10deg'})`,
              animation: `revealStat 0.8s ease-out ${index * 0.15}s forwards`,
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            <Card className="h-100 border-0 text-center" style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '25px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transform: `translateZ(${index * 10}px)`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = `translateY(-15px) translateZ(30px) rotateX(${index % 2 === 0 ? '5deg' : '-5deg'}) scale(1.05)`;
              e.currentTarget.style.boxShadow = `0 25px 60px rgba(0, 0, 0, 0.2), 0 0 40px ${index === 0 ? 'rgba(102, 126, 234, 0.3)' : index === 1 ? 'rgba(245, 87, 108, 0.3)' : index === 2 ? 'rgba(79, 172, 254, 0.3)' : 'rgba(250, 112, 154, 0.3)'}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `translateY(0) translateZ(${index * 10}px) rotateX(0) scale(1)`;
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                background: stat.gradient
              }}></div>
              <Card.Body className="p-4">
                <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                     style={{ 
                       width: '70px', 
                       height: '70px',
                       background: stat.iconBg,
                       boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                       transition: 'all 0.3s ease'
                     }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                     }}
                >
                  <i className={`fa-solid ${stat.icon}`} style={{ 
                    fontSize: '1.8rem',
                    color: 'white',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                  }}></i>
                </div>
                <Card.Title className="h2 mb-2 fw-bold" style={{
                  background: stat.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '2.5rem'
                }}>{stat.value}</Card.Title>
                <Card.Text className="text-muted mb-0 fw-semibold" style={{ fontSize: '1rem' }}>{stat.title}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Statistics

