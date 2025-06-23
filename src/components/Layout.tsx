import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { isLoggedIn, getCurrentUser } from "@/utils/auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [hasAnyRole, setHasAnyRole] = useState(false);

  // Get primary role name
  const getPrimaryRole = (user: any): string | null => {
    if (!user) return null;
    if (user.roles && user.roles.length > 0) return user.roles[0].name;
    return null;
  };

  useEffect(() => {
    const checkAuth = () => {
      const auth = isLoggedIn();
      setIsAuthenticated(auth);

      if (auth) {
        const user = getCurrentUser();
        setUserName(user?.name || "Guest");
        setUserRole(getPrimaryRole(user));
        setHasAnyRole(user?.roles?.length > 0);
      } else {
        setUserName(null);
        setUserRole(null);
        setHasAnyRole(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserName(null);
    setUserRole(null);
    window.location.href = "/login";
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <img
            src="/lovable-uploads/c4069bf7-facd-489e-9685-a7accf3eca49.png"
            alt="eSamudaay Logo"
            className="h-10 md:h-10 animate-scale-in w-auto"
          />

          {/* Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium">About</Link>
            <Link to="/bulletin" className="text-gray-700 hover:text-orange-500 font-medium">Bulletin</Link>

            {isAuthenticated && hasAnyRole && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-semibold border border-blue-600 px-3 py-1 rounded"
              >
                Dashboard
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogout}
                  className="inline-block bg-red-500 text-white font-medium px-4 py-2 rounded-xl shadow hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
                <Link to="/user/profile" className="text-gray-700 hover:text-orange-500 font-medium">
                  {userName}
                  {/* {userRole && <p className="ml-2 text-sm text-gray-500">({userRole == 'team_viewer' ? 'Team Member' : ''})</p>} */}
                </Link>
              </>
            ) : (
              <Link to="/login"
                className="inline-block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-medium px-4 py-2 rounded-xl shadow hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition-all"
              >
                Login
              </Link>
            )}
          </nav>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-4">
            <Link to="/" className="block text-gray-700 font-medium hover:text-orange-500" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block text-gray-700 font-medium hover:text-orange-500" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/bulletin" className="block text-gray-700 font-medium hover:text-orange-500" onClick={() => setMenuOpen(false)}>Bulletin</Link>

            {isAuthenticated && userName && (
              <div className="text-gray-700 font-medium">
                {userName}
                {/* {userRole && <p className="text-sm text-gray-500">({userRole == 'team_viewer' ? 'Team Member' : ''})</p>} */}
              </div>
            )}

            {isAuthenticated && hasAnyRole && (
              <Link
                to="/dashboard"
                className="block text-blue-600 font-medium hover:text-blue-800"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-500 text-white font-medium px-4 py-2 rounded-xl shadow hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-center font-medium px-4 py-2 rounded-xl shadow hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </header>

      <main className="pt-0">{children}</main>
    </>
  );
};

export default Layout;
