import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <main 
        className="cinematic-main"
        style={{ 
          minHeight: 'calc(100vh - 200px)',
          position: 'relative',
          background: '#0f0f1e',
          overflowX: 'hidden'
        }}
      >
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home searchTerm={searchTerm} />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
