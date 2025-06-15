import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Global Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500">Team Manager</h1>
          <nav className="space-x-6">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium">
              About
            </Link>
            <Link to="/post" className="text-gray-700 hover:text-orange-500 font-medium">
              Bulletin
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-0">{children}</main>
    </>
  );
};

export default Layout;
