import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, Book, BookOpen, MessageCircle, User, Edit, Settings, Calendar, Users } from 'lucide-react';
import BookCard, { Book as BookType } from '../components/books/BookCard';
import { useAuth } from '../contexts/AuthContext';

// Sample data (in a real app, this would come from Firebase)
const sampleBooks: BookType[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.pexels.com/photos/1629355/pexels-photo-1629355.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    isCompleted: true,
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
];

const Profile: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('books');
  
  // Would come from profile data in a real app
  const stats = {
    booksRead: userProfile?.booksRead || 28,
    booksReading: userProfile?.booksReading || 2,
    favoriteGenres: userProfile?.favoriteGenres || ['Fiction', 'Fantasy', 'Science Fiction'],
    followers: 45,
    following: 62,
    joined: userProfile?.joined || new Date('2023-01-15')
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        {/* Cover Image */}
        <div className="h-48 w-full bg-gradient-to-r from-primary-200 to-accent-200"></div>
        
        <div className="p-6 sm:p-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-6 sm:items-center">
              {/* Profile Image */}
              <div className="relative inline-block h-24 w-24 rounded-full ring-4 ring-white bg-primary-100 -mt-12 sm:-mt-16">
                {userProfile?.profilePicture ? (
                  <img 
                    src={userProfile.profilePicture} 
                    alt={userProfile.displayName} 
                    className="h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-full flex items-center justify-center bg-primary-200 text-primary-700">
                    <UserCircle className="h-14 w-14" />
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="mt-4 sm:mt-0">
                <h1 className="font-serif text-2xl font-bold text-gray-900">
                  {userProfile?.displayName || 'Your Name'}
                </h1>
                <p className="text-gray-600 mt-1">
                  Book lover and avid reader
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold">{stats.followers}</span> followers
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold">{stats.following}</span> following
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                    <span className="text-sm text-gray-600">
                      Joined {stats.joined.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="mt-6 sm:mt-0 flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
          
          {/* Bio */}
          <div className="mt-6 max-w-3xl">
            <p className="text-gray-700">
              {userProfile?.bio || "Hi there! I'm a book enthusiast who loves getting lost in fictional worlds. My favorite genres include fantasy, science fiction, and historical fiction. I'm always looking for new book recommendations!"}
            </p>
          </div>
          
          {/* Reading Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-primary-500 mr-2" />
                <span className="text-gray-700 font-medium">Books Read</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">{stats.booksRead}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Book className="h-5 w-5 text-secondary-600 mr-2" />
                <span className="text-gray-700 font-medium">Currently Reading</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">{stats.booksReading}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg col-span-2">
              <div className="flex items-center">
                <Book className="h-5 w-5 text-accent-600 mr-2" />
                <span className="text-gray-700 font-medium">Favorite Genres</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {stats.favoriteGenres.map((genre, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('books')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'books'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Books
            </span>
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'quotes'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Quotes
            </span>
          </button>
          <button
            onClick={() => setActiveTab('clubs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'clubs'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Book Clubs
            </span>
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'friends'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Followers & Following
            </span>
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div>
        {activeTab === 'books' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">My Books</h2>
              <Link 
                to="/my-library" 
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                View All in Library
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'quotes' && (
          <div className="py-12 text-center">
            <div className="bg-gray-50 rounded-xl py-12 px-6">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">You haven't saved any quotes yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start saving your favorite quotes from books you're reading!
              </p>
              <Link 
                to="/quotes" 
                className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Explore Quote Feed
              </Link>
            </div>
          </div>
        )}
        
        {activeTab === 'clubs' && (
          <div className="py-12 text-center">
            <div className="bg-gray-50 rounded-xl py-12 px-6">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">You haven't joined any book clubs yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Join a book club to discuss your favorite books with other readers!
              </p>
              <Link 
                to="/book-clubs" 
                className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Explore Book Clubs
              </Link>
            </div>
          </div>
        )}
        
        {activeTab === 'friends' && (
          <div className="py-12 text-center">
            <div className="bg-gray-50 rounded-xl py-12 px-6">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Connect with fellow readers</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Find and follow other readers to see what they're reading and discover new books!
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                Find Readers
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;