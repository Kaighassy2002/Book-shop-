import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LandingPage() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const parallaxRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleNavigate = () => {
    navigate("/home");
  };

  const parallaxOffset = scrollY * 0.5;
  const mouseOffsetX = (mousePos.x - window.innerWidth / 2) * 0.01;
  const mouseOffsetY = (mousePos.y - window.innerHeight / 2) * 0.01;

  return (
    <>
      <div 
        ref={parallaxRef}
        className="cinematic-landing"
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1e 100%)',
          perspective: '1000px'
        }}
      >
        {/* Animated Background Layers */}
        <div 
          className="parallax-layer layer-1"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle at 30% 50%, rgba(102, 126, 234, 0.3) 0%, transparent 50%)',
            transform: `translate(${mouseOffsetX * 2}px, ${mouseOffsetY * 2 + parallaxOffset * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
            zIndex: 1
          }}
        />
        <div 
          className="parallax-layer layer-2"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 70% 50%, rgba(245, 87, 108, 0.2) 0%, transparent 50%)',
            transform: `translate(${-mouseOffsetX * 1.5}px, ${-mouseOffsetY * 1.5 + parallaxOffset * 0.5}px)`,
            transition: 'transform 0.1s ease-out',
            zIndex: 2
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: `rgba(${Math.random() > 0.5 ? '102, 126, 234' : '245, 87, 108'}, ${Math.random() * 0.5 + 0.3})`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 20 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translate(${mouseOffsetX * (i % 3)}px, ${mouseOffsetY * (i % 3)}px)`,
              zIndex: 3
            }}
          />
        ))}

        {/* Main Content with 3D Transform */}
        <div 
          ref={heroRef}
          className="hero-content-cinematic"
          style={{
            position: 'relative',
            zIndex: 10,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `translateZ(0) rotateX(${mouseOffsetY * 0.1}deg) rotateY(${mouseOffsetX * 0.1}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="text-center text-white" style={{ 
            transform: 'translateZ(50px)',
            maxWidth: '900px',
            padding: '2rem'
          }}>
            {/* Asymmetrical Title Layout */}
            <div style={{
              position: 'relative',
              marginBottom: '3rem',
              transform: `translateY(${parallaxOffset * 0.2}px)`
            }}>
              <h1 
                className="cinematic-title"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  fontWeight: '900',
                  lineHeight: '1.1',
                  margin: 0,
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffd700 50%, #ff6b6b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 80px rgba(255, 215, 0, 0.5)',
                  transform: `translateX(${mouseOffsetX * 0.5}px)`,
                  letterSpacing: '-0.02em',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
              >
                <span style={{ display: 'block', transform: 'translateX(-5%)' }}>BOOK</span>
                <span style={{ display: 'block', transform: 'translateX(5%)', marginTop: '-0.2em' }}>SHOP</span>
              </h1>
              <div 
                className="title-glow"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                  zIndex: -1,
                  animation: 'pulseGlow 3s ease-in-out infinite'
                }}
              />
            </div>

            {/* Motion-Revealed Description */}
            <p 
              className="cinematic-description"
              style={{ 
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                lineHeight: '1.8',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '3rem',
                transform: `translateY(${parallaxOffset * 0.3}px) translateX(${mouseOffsetX * 0.3}px)`,
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
                fontWeight: '300',
                letterSpacing: '0.05em'
              }}
            >
              Immerse yourself in a <span style={{ color: '#ffd700', fontWeight: '600' }}>cinematic</span> journey through literature.
              <br />
              Where every page turns into an <span style={{ color: '#ff6b6b', fontWeight: '600' }}>experience</span>.
            </p>

            {/* Interactive CTA Button */}
            <Button 
              size="lg" 
              onClick={handleNavigate}
              className="cinematic-cta"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ff6b6b 100%)',
                border: 'none',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '1.3rem',
                padding: '1.2rem 4rem',
                boxShadow: '0 20px 60px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 107, 107, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                transform: `translateY(${parallaxOffset * 0.4}px) translateZ(100px)`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translateY(${parallaxOffset * 0.4}px) translateZ(100px) scale(1.1)`
                e.currentTarget.style.boxShadow = '0 30px 80px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 107, 107, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translateY(${parallaxOffset * 0.4}px) translateZ(100px) scale(1)`
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 107, 107, 0.3)'
              }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>
                Enter Library
                <i className="fa-solid fa-arrow-right ms-3" style={{ transform: 'translateX(0)', transition: 'transform 0.3s' }}></i>
              </span>
              <div 
                className="button-shine"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  transition: 'left 0.5s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.left = '100%'
                }}
              />
            </Button>

            {/* Scroll Indicator */}
            <div 
              className="scroll-indicator"
              style={{
                position: 'absolute',
                bottom: '3rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: 0.6,
                animation: 'bounceScroll 2s infinite'
              }}
            >
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.2em' }}>SCROLL</span>
              <div style={{
                width: '2px',
                height: '30px',
                background: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8), transparent)'
              }} />
            </div>
          </div>
        </div>

        {/* Depth Layers - Background Elements */}
        <div 
          className="depth-element"
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            transform: `translateZ(-200px) translate(${mouseOffsetX * 3}px, ${mouseOffsetY * 3}px)`,
            zIndex: 0
          }}
        />
        <div 
          className="depth-element"
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '15%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(245, 87, 108, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            transform: `translateZ(-150px) translate(${-mouseOffsetX * 2}px, ${-mouseOffsetY * 2}px)`,
            zIndex: 0
          }}
        />
      </div>
    </>
  )
}

export default LandingPage
