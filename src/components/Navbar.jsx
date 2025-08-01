// src/components/Navbar.jsx
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black/60 backdrop-blur border-b border-orange-500/20 shadow-sm">
      <Link to="/" className="text-xl font-bold text-orange-400">Film Orbit</Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-orange-400 transition">Home</Link>
      </div>
    </nav>
  )
}

export default Navbar