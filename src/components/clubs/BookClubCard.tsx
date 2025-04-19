import React from 'react';
import { Users, Calendar, Book, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BookClub {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  membersCount: number;
  currentBook?: {
    id: string;
    title: string;
    author: string;
    coverImage: string;
  };
  nextMeeting?: Date;
  category: string;
}

interface BookClubCardProps {
  club: BookClub;
}

const BookClubCard: React.FC<BookClubCardProps> = ({ club }) => {
  return (
    <div className="book-card bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 h-full">
      <div className="relative">
        <img 
          src={club.coverImage} 
          alt={club.name} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <div className="absolute top-2 right-2 bg-white/90 text-primary-700 text-xs px-2 py-1 rounded-full">
          {club.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800">{club.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{club.description}</p>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Users className="w-4 h-4 mr-1 text-primary-500" />
          <span>{club.membersCount} members</span>
        </div>
        
        {club.currentBook && (
          <div className="flex items-start mt-4 pb-4 border-b border-gray-100">
            <img 
              src={club.currentBook.coverImage} 
              alt={club.currentBook.title} 
              className="w-12 h-16 object-cover rounded-md shadow-sm"
            />
            <div className="ml-3">
              <p className="text-xs text-gray-500 mb-1">Currently Reading</p>
              <h4 className="font-medium text-gray-800 text-sm line-clamp-1">{club.currentBook.title}</h4>
              <p className="text-xs text-gray-600">by {club.currentBook.author}</p>
            </div>
          </div>
        )}
        
        {club.nextMeeting && (
          <div className="flex items-center mt-3 text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1 text-accent-500" />
            <span>Next meeting: {new Date(club.nextMeeting).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <Link 
          to={`/book-clubs/${club.id}`}
          className="flex justify-between items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
        >
          <span>View Club Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default BookClubCard;