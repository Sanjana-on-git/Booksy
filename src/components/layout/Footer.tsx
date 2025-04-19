import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Instagram, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12 pt-10 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-8 h-8 text-primary-500" />
              <span className="font-serif font-bold text-2xl text-primary-800">Booksy</span>
            </div>
            <p className="text-gray-600 mb-4">
              A cozy platform for book lovers to connect, share, and discover their next favorite read.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:hello@booksy.com" className="text-gray-500 hover:text-primary-500 transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-serif font-semibold text-lg mb-4 text-gray-900">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/my-library" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  My Library
                </Link>
              </li>
              <li>
                <Link to="/book-clubs" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Book Clubs
                </Link>
              </li>
              <li>
                <Link to="/swap-shelf" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Swap Shelf
                </Link>
              </li>
              <li>
                <Link to="/quotes" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Quote Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="col-span-1">
            <h3 className="font-serif font-semibold text-lg mb-4 text-gray-900">Community</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Book Club FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Swap Shelf Rules
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Submit a Bug
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary-500 transition-colors duration-200">
                  Request a Feature
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-serif font-semibold text-lg mb-4 text-gray-900">Join Our Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Get weekly book recommendations and Booksy updates
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-white font-medium bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 text-center border-t border-gray-200">
          <p className="text-gray-600 text-sm flex justify-center items-center">
            © {new Date().getFullYear()} Booksy. Made with <Heart className="mx-1 h-4 w-4 text-primary-500" /> for book lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;