
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './compontents/Footer'
import Header from './compontents/Header'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'


function App() {
 

  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/home' element={<Home/>} />
        
      </Routes>
      <Footer/>
    </>
  )
}

export default App
