import React from 'react'
import { Link, useMatch, useResolvedPath} from 'react-router-dom'
import './Navbar.css'

const Navbar = ({username}) => {
  return (
    <header className="header">
        <Link to="/" className="logo">Logo</Link>
        <div className="bozo"></div>
        <p>User logged-in: {username || "none"}  </p>

        <nav className="navbar">
          <ul>
            <CustomLink to="/" className="Home">Home</CustomLink>
            <CustomLink to="/" className="About">About</CustomLink>
            <CustomLink to="/" className="Upload">Upload</CustomLink>
            <CustomLink to="/comics" className="Comics">Comics</CustomLink>
            <CustomLink to="/login" className="Sign-in">Sign-in</CustomLink>
          </ul>
            
        </nav>
    </header>
    
  )
}

const CustomLink = ({to, children, ...props}) => {

  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({path : resolvedPath.pathname, end:true});

  return (
    <li className={isActive ? "active" : "unactive"}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navbar