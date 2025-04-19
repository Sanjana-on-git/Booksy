import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, BookMarked, Share2 } from 'lucide-react';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating?: number;
  isReading?: boolean;
  isCompleted?: boolean;
  genres?: string[];
}

interface BookCardProps {
  book: Book;
  isCompact?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, isCompact = false }) => {
  if (isCompact) {
    return (
      <Link to={`/book/${book.id}`} className="book-card flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`} 
          className="w-12 h-16 object-cover rounded-md shadow-sm"
        />
        <div className="ml-3 flex-1">
          <h3 className="font-medium text-gray-800 line-clamp-1">{book.title}</h3>
          <p className="text-sm text-gray-600">by {book.author}</p>
        </div>
        {book.isReading && (
          <span className="bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
            Reading
          </span>
        )}
        {book.isCompleted && (
          <span className="bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded-full">
            Read
          </span>
        )}
      </Link>
    );
  }

  return (
    <div className="book-card bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 flex flex-col h-full">
      <Link to={`/book/${book.id}`} className="relative block">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`} 
          className="w-full h-56 object-cover"
        />
        {book.isReading && (
          <div className="absolute top-2 right-2 bg-secondary-100 text-secondary-800 text-xs px-2 py-1 rounded-full">
            Reading
          </div>
        )}
        {book.isCompleted && (
          <div className="absolute top-2 right-2 bg-accent-100 text-accent-800 text-xs px-2 py-1 rounded-full">
            Read
          </div>
        )}
      </Link>
      
      <div className="p-4 flex-grow">
        <Link to={`/book/${book.id}`}>
          <h3 className="font-serif font-semibold text-lg mb-1 text-gray-800 hover:text-primary-600 transition-colors duration-200">{book.title}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        
        {book.genres && (
          <div className="flex flex-wrap gap-1 mb-3">
            {book.genres.slice(0, 2).map((genre, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        
        {book.rating && (
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < book.rating! ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600">{book.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      <div className="px-4 py-3 border-t border-gray-100 flex justify-between">
        <button className="text-gray-500 hover:text-primary-500 transition-colors duration-200">
          <BookMarked className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-red-500 transition-colors duration-200">
          <Heart className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-accent-500 transition-colors duration-200">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BookCard;