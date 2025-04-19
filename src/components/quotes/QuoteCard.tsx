import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  profilePicture?: string;
}

export interface Quote {
  id: string;
  text: string;
  book: {
    id: string;
    title: string;
    author: string;
    coverImage: string;
  };
  user: User;
  likes: number;
  comments: number;
  createdAt: Date;
  isLiked?: boolean;
  isSaved?: boolean;
}

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  const [isLiked, setIsLiked] = useState(quote.isLiked || false);
  const [isSaved, setIsSaved] = useState(quote.isSaved || false);
  const [likesCount, setLikesCount] = useState(quote.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(quote.createdAt);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300">
      <div className="p-5">
        {/* User info */}
        <div className="flex items-center mb-4">
          <Link to={`/profile/${quote.user.id}`} className="flex items-center group">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {quote.user.profilePicture ? (
                <img 
                  src={quote.user.profilePicture} 
                  alt={quote.user.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-medium">
                  {quote.user.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors duration-200">{quote.user.name}</p>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
          </Link>
        </div>

        {/* Quote text */}
        <blockquote className="italic text-lg text-gray-700 border-l-4 border-primary-300 pl-4 my-4">
          "{quote.text}"
        </blockquote>

        {/* Book info */}
        <Link to={`/book/${quote.book.id}`} className="flex items-center mt-4 group">
          <img 
            src={quote.book.coverImage} 
            alt={quote.book.title} 
            className="w-12 h-16 object-cover rounded-md shadow-sm"
          />
          <div className="ml-3">
            <h4 className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors duration-200">{quote.book.title}</h4>
            <p className="text-sm text-gray-600">by {quote.book.author}</p>
          </div>
        </Link>
      </div>

      {/* Actions */}
      <div className="px-5 py-3 border-t border-gray-100 flex justify-between">
        <button 
          onClick={handleLike}
          className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'} transition-colors duration-200`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </button>
        
        <button 
          onClick={handleToggleComments}
          className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors duration-200"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{quote.comments}</span>
        </button>
        
        <button 
          onClick={handleSave}
          className={`flex items-center space-x-1 ${isSaved ? 'text-accent-600' : 'text-gray-500 hover:text-accent-600'} transition-colors duration-200`}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          <span>Save</span>
        </button>
        
        <button className="flex items-center space-x-1 text-gray-500 hover:text-primary-500 transition-colors duration-200">
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Comment section - would be expanded with actual implementation */}
      {showComments && (
        <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-center text-gray-500 text-sm">Comments would appear here</p>
        </div>
      )}
    </div>
  );
};

export default QuoteCard;