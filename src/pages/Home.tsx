import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, BookMarked, Quote, Users, BookOpen, RefreshCw } from 'lucide-react';
import MoodSelector from '../components/moods/MoodSelector';
import BookCard, { Book as BookType } from '../components/books/BookCard';
import QuoteCard, { Quote as QuoteType } from '../components/quotes/QuoteCard';
import { useAuth } from '../contexts/AuthContext';

// Sample data (in a real app, this would come from Firebase)
const sampleBooks: BookType[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.pexels.com/photos/1629355/pexels-photo-1629355.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    genres: ['Fiction', 'Fantasy']
  },
  {
    id: '2',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverImage: 'https://images.pexels.com/photos/2873669/pexels-photo-2873669.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    genres: ['Science Fiction']
  },
  {
    id: '3',
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    coverImage: 'https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    genres: ['Fiction', 'Historical']
  },
  {
    id: '4',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    coverImage: 'https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    genres: ['Fiction', 'Mythology']
  }
];

// Sample quote
const sampleQuote: QuoteType = {
  id: '1',
  text: "Between the pages of a book is a lovely place to be.",
  book: {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.pexels.com/photos/1629355/pexels-photo-1629355.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  user: {
    id: '1',
    name: 'Emily Johnson'
  },
  likes: 24,
  comments: 3,
  createdAt: new Date('2023-06-15')
};

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodBooks, setMoodBooks] = useState<BookType[]>([]);

  useEffect(() => {
    // In a real app, we would fetch mood-based recommendations from Firebase
    // For demo purposes, we'll just use the sample books
    if (selectedMood) {
      setMoodBooks(sampleBooks.slice(0, 3));
    }
  }, [selectedMood]);

  const handleMoodSelect = (mood: { id: string, name: string }) => {
    setSelectedMood(mood.id);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-100 to-accent-100 py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-secondary-200 rounded-full opacity-20"></div>
          <div className="absolute top-40 -left-20 w-80 h-80 bg-primary-300 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 right-20 w-48 h-48 bg-accent-300 rounded-full opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Cozy Corner in the <span className="text-primary-600">Book</span> Universe
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Discover, connect, and share your reading journey with a community that loves books as much as you do.
            </p>
            
            {!currentUser ? (
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/signup" 
                  className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Join Our Community
                </Link>
                <Link 
                  to="/login" 
                  className="bg-white hover:bg-gray-100 text-primary-600 font-semibold py-3 px-6 rounded-lg shadow-sm transition-colors duration-200"
                >
                  Log In
                </Link>
              </div>
            ) : (
              <Link 
                to="/my-library" 
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block"
              >
                Go to My Library
              </Link>
            )}
          </div>
        </div>
      </section>
      
      {/* Mood-Based Recommendations */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Book className="text-primary-500 mr-3" />
              Mood-Based Recommendations
            </h2>
            
            <MoodSelector onSelectMood={handleMoodSelect} />
            
            {selectedMood && moodBooks.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-serif mb-6">Perfect reads for your mood</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {moodBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Features Overview */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-12 text-center">
            Discover What Makes Booksy Special
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mb-4">
                <BookMarked className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Book Journaling & Notes</h3>
              <p className="text-gray-600">
                Document your reading journey with personal reflections, favorite passages, and insights.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-secondary-100 text-secondary-600 rounded-lg flex items-center justify-center mb-4">
                <Quote className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Quote Catcher</h3>
              <p className="text-gray-600">
                Save, share, and discover meaningful quotes that resonate with readers worldwide.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-accent-100 text-accent-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Virtual Book Clubs</h3>
              <p className="text-gray-600">
                Connect with fellow book lovers in themed reading groups with discussions and meetups.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Character Relationship Maps</h3>
              <p className="text-gray-600">
                Visualize and track complex character relationships in your favorite books.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Swap Shelf</h3>
              <p className="text-gray-600">
                Trade books with community members, giving pre-loved books new homes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                <Book className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Blind Book Dating</h3>
              <p className="text-gray-600">
                Discover your next favorite read through our personalized recommendation quiz.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Quote */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Quote className="text-primary-500 mr-3" />
              Featured Quote
            </h2>
            
            <QuoteCard quote={sampleQuote} />
            
            <div className="mt-8 text-center">
              <Link 
                to="/quotes" 
                className="inline-block px-6 py-3 bg-accent-100 text-accent-800 font-medium rounded-lg hover:bg-accent-200 transition-colors duration-200"
              >
                Explore Quote Feed
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Stats */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-secondary-100 to-secondary-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-lg text-gray-700">
              Connect with fellow book lovers from around the world
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">5,000+</p>
              <p className="text-gray-600">Active Readers</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">10,000+</p>
              <p className="text-gray-600">Books Shared</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">500+</p>
              <p className="text-gray-600">Book Clubs</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <p className="text-4xl font-bold text-primary-600 mb-2">20,000+</p>
              <p className="text-gray-600">Quotes Saved</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 md:p-12 shadow-lg text-white text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Next Great Read?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Join Booksy today and discover a community that celebrates the magic of books.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/signup" 
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg shadow-sm transition-colors duration-200"
              >
                Sign Up Free
              </Link>
              <Link 
                to="/login" 
                className="bg-transparent hover:bg-white/10 text-white border border-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;