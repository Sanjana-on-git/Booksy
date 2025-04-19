import React, { useState } from 'react';
import { Tabs, BookOpen, BookMarked, Bookmark, Clock, Plus } from 'lucide-react';
import BookCard, { Book } from '../components/books/BookCard';
import { useAuth } from '../contexts/AuthContext';

// Sample data (in a real app, this would come from Firebase)
const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.pexels.com/photos/1629355/pexels-photo-1629355.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    isReading: true,
    genres: ['Fiction', 'Fantasy']
  },
  {
    id: '2',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverImage: 'https://images.pexels.com/photos/2873669/pexels-photo-2873669.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    isReading: true,
    genres: ['Science Fiction']
  },
  {
    id: '3',
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    coverImage: 'https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    isCompleted: true,
    genres: ['Fiction', 'Historical']
  },
  {
    id: '4',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    coverImage: 'https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    isCompleted: true,
    genres: ['Fiction', 'Mythology']
  },
  {
    id: '5',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    coverImage: 'https://images.pexels.com/photos/4153146/pexels-photo-4153146.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    isCompleted: true,
    genres: ['Fiction', 'Historical']
  },
  {
    id: '6',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://images.pexels.com/photos/3432695/pexels-photo-3432695.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    genres: ['Science Fiction', 'Adventure']
  }
];

const MyLibrary: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('reading');
  
  const filterBooks = () => {
    switch (activeTab) {
      case 'reading':
        return sampleBooks.filter(book => book.isReading);
      case 'completed':
        return sampleBooks.filter(book => book.isCompleted);
      case 'wishlist':
        return sampleBooks.filter(book => !book.isReading && !book.isCompleted);
      default:
        return sampleBooks;
    }
  };

  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case 'reading':
        return "You're not currently reading any books. Add a book to get started!";
      case 'completed':
        return "You haven't marked any books as completed yet.";
      case 'wishlist':
        return "Your wishlist is empty. Add books you want to read in the future!";
      default:
        return "No books found.";
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">My Library</h1>
          <p className="text-gray-600">
            {userProfile ? `Track your reading journey, ${userProfile.displayName}` : 'Track your reading journey'}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
            <Plus className="w-5 h-5 mr-2" />
            Add Book
          </button>
        </div>
      </div>

      {/* Reading Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Books</p>
            <p className="text-2xl font-bold text-gray-900">
              {userProfile?.booksRead || sampleBooks.length}
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center">
          <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center mr-4">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Currently Reading</p>
            <p className="text-2xl font-bold text-gray-900">
              {userProfile?.booksReading || sampleBooks.filter(book => book.isReading).length}
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center">
          <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-lg flex items-center justify-center mr-4">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-2xl font-bold text-gray-900">
              {sampleBooks.filter(book => book.isCompleted).length}
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center">
          <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center mr-4">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Reading Streak</p>
            <p className="text-2xl font-bold text-gray-900">7 days</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('reading')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reading'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Currently Reading
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'wishlist'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Wishlist
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All Books
          </button>
        </nav>
      </div>

      {/* Book Grid */}
      {filterBooks().length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterBooks().map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="bg-gray-50 rounded-xl py-12 px-6">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{getEmptyStateMessage()}</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Start building your library by adding books you're interested in.
            </p>
            <button className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLibrary;