import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageCircle } from 'lucide-react';

export interface SwapBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  condition: 'Like New' | 'Good' | 'Fair' | 'Well-loved';
  user: {
    id: string;
    name: string;
    profilePicture?: string;
    location: string;
  };
  description?: string;
  genres?: string[];
  listedDate: Date;
  type: 'Swap' | 'Giveaway';
}

interface SwapCardProps {
  book: SwapBook;
}

const SwapCard: React.FC<SwapCardProps> = ({ book }) => {
  const conditionColor = {
    'Like New': 'bg-green-100 text-green-800',
    'Good': 'bg-blue-100 text-blue-800',
    'Fair': 'bg-yellow-100 text-yellow-800',
    'Well-loved': 'bg-orange-100 text-orange-800',
  };

  const typeColor = {
    'Swap': 'bg-accent-100 text-accent-800',
    'Giveaway': 'bg-secondary-100 text-secondary-800',
  };

  return (
    <div className="book-card bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 h-full">
      <div className="relative">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-60 object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <span className={`${typeColor[book.type]} text-xs px-2 py-1 rounded-full`}>
            {book.type}
          </span>
          <span className={`${conditionColor[book.condition]} text-xs px-2 py-1 rounded-full`}>
            {book.condition}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-serif font-semibold text-lg mb-1 text-gray-800">{book.title}</h3>
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
            {book.genres.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                +{book.genres.length - 2}
              </span>
            )}
          </div>
        )}
        
        {book.description && (
          <p className="text-gray-700 text-sm mt-3 mb-4 line-clamp-2">
            {book.description}
          </p>
        )}
        
        <div className="flex items-center mt-4 pt-3 border-t border-gray-100">
          <Link to={`/profile/${book.user.id}`} className="flex items-center group">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              {book.user.profilePicture ? (
                <img 
                  src={book.user.profilePicture} 
                  alt={book.user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-medium">
                  {book.user.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="ml-2">
              <p className="font-medium text-sm text-gray-800 group-hover:text-primary-600 transition-colors duration-200">{book.user.name}</p>
            </div>
          </Link>
          
          <div className="ml-auto flex items-center text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{book.user.location}</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <button className="w-full py-2 text-primary-600 hover:text-primary-700 font-medium bg-primary-50 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors duration-200">
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact for {book.type}
        </button>
      </div>
    </div>
  );
};

export default SwapCard;