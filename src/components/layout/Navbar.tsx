import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, User, Menu, X, LogOut, BookMarked, Users, RefreshCw } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when location changes
    setIsMenuOpen(false);
  }, [location]);

  const navLinkClass = "px-4 py-2 font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200";
  const activeNavLinkClass = "px-4 py-2 font-medium text-primary-600 border-b-2 border-primary-500";

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-500" />
            <span className="font-serif font-bold text-2xl text-primary-800">Booksy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className={location.pathname === '/' ? activeNavLinkClass : navLinkClass}>
              Home
            </Link>
            {currentUser && (
              <>
                <Link to="/my-library" className={location.pathname === '/my-library' ? activeNavLinkClass : navLinkClass}>
                  My Library
                </Link>
                <Link to="/book-clubs" className={location.pathname === '/book-clubs' ? activeNavLinkClass : navLinkClass}>
                  Book Clubs
                </Link>
                <Link to="/swap-shelf" className={location.pathname === '/swap-shelf' ? activeNavLinkClass : navLinkClass}>
                  Swap Shelf
                </Link>
                <Link to="/quotes" className={location.pathname === '/quotes' ? activeNavLinkClass : navLinkClass}>
                  Quotes
                </Link>
              </>
            )}
          </nav>

          {/* User Menu or Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <User className="w-5 h-5 text-primary-500" />
                  <span className="font-medium text-gray-700">Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="px-4 py-2 font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors duration-200">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="bg-white px-4 pt-2 pb-4 space-y-1 border-t border-gray-200">
          <Link to="/" className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md">
            Home
          </Link>
          
          {currentUser ? (
            <>
              <Link to="/my-library" className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md">
                <BookMarked className="mr-3 h-5 w-5 text-gray-500" />
                My Library
              </Link>
              <Link to="/book-clubs" className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md">
                <Users className="mr-3 h-5 w-5 text-gray-500" />
                Book Clubs
              </Link>
              <Link to="/swap-shelf" className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md">
                <RefreshCw className="mr-3 h-5 w-5 text-gray-500" />
                Swap Shelf
              </Link>
              <Link to="/quotes" className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md">
                Quotes
              </Link>
              <Link to="/profile" className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md">
                <User className="mr-3 h-5 w-5 text-gray-500" />
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-500" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 mt-4 px-4">
              <Link to="/login" className="w-full py-2 text-center font-medium text-primary-600 hover:text-primary-800 border border-primary-500 rounded-lg transition-colors duration-200">
                Login
              </Link>
              <Link to="/signup" className="w-full py-2 text-center font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors duration-200">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;