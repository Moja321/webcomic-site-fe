import React from 'react'
import './Navbar.css'

const Navbar = ({username}) => {
  return (
    <header className="header">
        <a href="" className="logo">Logo</a>
        <div className="bozo"></div>
        <p>User logged-in: {username || "none"}  </p>

        <nav className="navbar">
            <a href="/" className="Home">Home</a>
            <a href="/" className="About">About</a>
            <a href="/" className="Upload">Upload</a>
            <a href="/" className="Comics">Comics</a>
            <a href="/" className="Sign-in">Sign-in</a>
        </nav>
    </header>
    
  )
}

export default Navbar