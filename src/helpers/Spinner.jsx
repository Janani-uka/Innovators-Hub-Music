import React from 'react'
import './Spinner.css'
const Spinner = () => {
  return (
    <div className='  h-[100vh] w-[100vw] fixed top-0 left-0 bg-black/70 flex justify-center items-center'>
        <div id="container">
  <div className="spinner">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
    </div>
  )
}

export default Spinner