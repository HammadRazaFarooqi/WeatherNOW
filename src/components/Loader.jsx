import React from 'react'
import gif from "../asset/loader.gif"

function Loader() {
  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
       <img src={gif} alt="Loader" />
    </div>
  )
}

export default Loader