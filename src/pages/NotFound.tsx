import React from 'react';
import { Link } from 'react-router-dom';
import { BookX, Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
      <BookX className="w-24 h-24 text-primary-300 mb-6" />
      
      <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      
      <p className="text-lg text-gray-600 max-w-lg mb-8">
        Oops! The page you're looking for seems to have wandered off to a different bookshelf. 
        Let's help you find your way back.
      </p>
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-12">
        <Link 
          to="/" 
          className="flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <Home className="w-5 h-5 mr-2" />
          Return Home
        </Link>
        
        <Link 
          to="/my-library" 
          className="flex items-center justify-center bg-white hover:bg-gray-100 text-primary-600 font-medium py-3 px-6 rounded-lg border border-primary-500 transition-colors duration-200"
        >
          <Search className="w-5 h-5 mr-2" />
          Find a Book
        </Link>
      </div>
      
      <div className="bg-secondary-50 rounded-xl p-6 max-w-lg">
        <h2 className="font-serif text-xl font-semibold text-gray-800 mb-4">
          Looking for something to read?
        </h2>
        <p className="text-gray-600 mb-4">
          Maybe it's time to discover a new favorite book. Head over to your library or check out the latest recommendations.
        </p>
        <div className="flex justify-center">
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Get book recommendations →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;