import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-black px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-primary text-xl font-bold">
        🎬 MovieVerse
      </Link>
    </nav>
  )
}

export default Navbar
