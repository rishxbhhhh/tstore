import React from 'react'
import {GrCart} from 'react-icons/gr'
import './Navbar.css'

function Navbar() {
  return (
    <div className="navbar">
      <h2 className="nav__title">{"TeeStore".toUpperCase().trim()}</h2>
      <GrCart className='nav__cart'/>
    </div>
  )
}

export default Navbar