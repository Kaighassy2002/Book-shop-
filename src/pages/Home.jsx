import React, { useState } from 'react'

import Add from '../compontents/Add'
import ViewCard from '../compontents/ViewCard'

function Home() {
 
  return (
    <>
      <div >
        <div className="mb-5">
            <img width={'100%'} height={'500px'} src="https://www.housedigest.com/img/gallery/how-to-make-custom-wallpaper-using-old-book-pages/intro-1660552487.jpg" alt="" />
        </div>    
      </div>
     
      <Add/>
      
      <ViewCard/>
    </>
  )
}

export default Home
