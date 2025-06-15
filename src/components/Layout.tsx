import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // lucide icons (or replace with your preferred icons)

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500">Team Manager</h1>

          {/* Hamburger (Mobile) */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium">
              About
            </Link>
            <Link to="/post" className="text-gray-700 hover:text-orange-500 font-medium">
              Bulletin
            </Link>
            <Link
              to="/dashboard"
              className="inline-block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-medium px-4 py-2 rounded-xl shadow hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition-all"
            >
              Admin Login
            </Link>
          </nav>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 font-medium hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block text-gray-700 font-medium hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/post"
              className="block text-gray-700 font-medium hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              Bulletin
            </Link>
            <Link
              to="/dashboard"
              className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-center font-medium px-4 py-2 rounded-xl shadow hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="pt-0">{children}</main>
    </>
  );
};

export default Layout;