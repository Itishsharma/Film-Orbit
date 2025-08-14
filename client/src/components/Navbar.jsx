import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(){
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-panel-dark border-b border-accent-dark">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <span className="px-3 py-1 rounded-md bg-gradient-to-r from-accent to-accent-dark">Film</span>
          <span className="text-muted">Orbit</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/profile" className="hover:text-accent">Profile</Link>
          {token
            ? <button onClick={logout} className="btn-accent">Logout</button>
            : <Link to="/login" className="btn-accent">Login</Link>}
        </div>
      </div>
    </nav>
  )
}
