import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-background text-light px-4 py-3 flex items-center justify-between shadow-md">
      <h1 className="text-2xl font-bold text-accent">Film Orbit</h1>
      <input
        type="text"
        placeholder="Search movies..."
        className="px-3 py-1 rounded-lg bg-dark text-light border border-hoverAccent"
      />
    </nav>
  );
};

export default Navbar;
