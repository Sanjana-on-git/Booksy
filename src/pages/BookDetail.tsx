import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, Bookmark, PenSquare, MessageCircle, Users, BookOpen } from 'lucide-react';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';

// In a real app, this would come from Firebase and be more complex
interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    profilePicture?: string;
  };
  rating: number;
  text: string;
  date: Date;
}

interface Quote {
  id: string;
  text: string;
  user: {
    id: string;
    name: string;
  };
  likes: number;
}

interface BookClub {
  id: string;
  name: string;
  membersCount: number;
  coverImage: string;
}

interface BookDetails {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  genres: string[];
  description: string;
  pageCount: number;
  publishedDate: string;
  publisher: string;
  isbn: string;
  readCount: number;
  ratingsCount: number;
  reviews: Review[];
  quotes: Quote[];
  clubs?: BookClub[];
}

// Sample data - in a real app, this would come from Firebase
const sampleBook: BookDetails = {
  id: '1',
  title: 'The Midnight Library',
  author: 'Matt Haig',
  coverImage: 'https://images.pexels.com/photos/1629355/pexels-photo-1629355.jpeg?auto=compress&cs=tinysrgb&w=800',
  rating: 4.5,
  genres: ['Fiction', 'Fantasy', 'Contemporary'],
  description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
  pageCount: 304,
  publishedDate: 'August 13, 2020',
  publisher: 'Viking',
  isbn: '9780525559474',
  readCount: 2468,
  ratingsCount: 198,
  reviews: [
    {
      id: '1',
      user: {
        id: '1',
        name: 'Emily Johnson',
        profilePicture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800',
      },
      rating: 5,
      text: 'This book resonated with me deeply. The concept of the midnight library and the exploration of regret and choices made for a thought-provoking and emotional read.',
      date: new Date('2023-02-15'),
    },
    {
      id: '2',
      user: {
        id: '2',
        name: 'Michael Chen',
      },
      rating: 4,
      text: 'A beautiful story about the infinite possibilities of life and the importance of appreciating what we have. Well-written and engaging.',
      date: new Date('2023-01-20'),
    },
  ],
  quotes: [
    {
      id: '1',
      text: 'Between life and death there is a library, and within that library, the shelves go on forever.',
      user: {
        id: '1',
        name: 'Emily Johnson',
      },
      likes: 42,
    },
    {
      id: '2',
      text: 'Never underestimate the big importance of small things.',
      user: {
        id: '3',
        name: 'Sophia Martinez',
      },
      likes: 28,
    },
  ],
  clubs: [
    {
      id: '1',
      name: 'Fantasy Book Lovers',
      membersCount: 328,
      coverImage: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      name: 'Contemporary Fiction Club',
      membersCount: 145,
      coverImage: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800',
    }
  ]
};

const BookDetail: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [readingStatus, setReadingStatus] = useState<'reading' | 'completed' | 'wishlist' | null>(null);
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    // In a real app, this would fetch from Firebase based on bookId
    // For demo purposes, we're using the sample data
    const fetchBook = async () => {
      try {
        // Simulate network request
        setTimeout(() => {
          setBook(sampleBook);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching book:', error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userRating) {
      alert('Please select a rating');
      return;
    }
    
    // In a real app, this would save to Firebase
    console.log('Submitting review:', { bookId, rating: userRating, text: reviewText });
    
    // Reset form
    setUserRating(null);
    setReviewText('');
    setShowReviewForm(false);
    
    // Show a success message - in real app would add to reviews list
    alert('Review submitted successfully!');
  };

  const handleSetReadingStatus = (status: string) => {
    // In a real app, this would update the user's library in Firebase
    setReadingStatus(status as 'reading' | 'completed' | 'wishlist' | null);
    
    // Show confirmation
    if (status) {
      alert(`Book added to your ${status} list!`);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">Book not found</h2>
        <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Book Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="md:flex">
          {/* Cover Image */}
          <div className="md:flex-shrink-0">
            <img 
              src={book.coverImage} 
              alt={`${book.title} cover`} 
              className="h-64 w-full object-cover md:w-48 md:h-auto"
            />
          </div>
          
          {/* Book Info */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex-grow">
              <div className="flex flex-wrap items-center">
                {book.genres.map((genre, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2 mt-2">{book.title}</h1>
              <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{book.rating.toFixed(1)} ({book.ratingsCount} ratings)</span>
              </div>
              
              <p className="text-gray-700 mb-6 line-clamp-3 md:line-clamp-none">{book.description}</p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-auto">
              <div className="relative">
                <select
                  value={readingStatus || ''}
                  onChange={(e) => handleSetReadingStatus(e.target.value)}
                  className="appearance-none px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg pr-10 transition-colors duration-200"
                >
                  <option value="">Add to Library</option>
                  <option value="reading">Currently Reading</option>
                  <option value="completed">Completed</option>
                  <option value="wishlist">Want to Read</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              
              <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200">
                <Heart className="w-5 h-5 mr-2" />
                Favorite
              </button>
              
              <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200">
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'quotes'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Quotes
          </button>
          <button
            onClick={() => setActiveTab('clubs')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'clubs'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Book Clubs
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">About the Book</h2>
                <p className="text-gray-700 mb-6">{book.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Publisher</h3>
                    <p className="text-gray-700">{book.publisher}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Published Date</h3>
                    <p className="text-gray-700">{book.publishedDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Pages</h3>
                    <p className="text-gray-700">{book.pageCount}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">ISBN</h3>
                    <p className="text-gray-700">{book.isbn}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Reader Stats</h2>
                
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Rating Distribution</span>
                    <span className="text-gray-600">{book.ratingsCount} ratings</span>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <span className="w-8 text-sm text-gray-600">{rating}★</span>
                        <div className="flex-grow mx-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full"
                            style={{
                              width: `${rating === 5 ? 70 : 
                                      rating === 4 ? 20 : 
                                      rating === 3 ? 5 : 
                                      rating === 2 ? 3 : 2}%`
                            }}
                          ></div>
                        </div>
                        <span className="w-8 text-right text-sm text-gray-600">
                          {rating === 5 ? 70 : 
                           rating === 4 ? 20 : 
                           rating === 3 ? 5 : 
                           rating === 2 ? 3 : 2}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-gray-900">{book.readCount}</p>
                    <p className="text-gray-700">Readers</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-gray-900">{book.quotes.length}</p>
                    <p className="text-gray-700">Quotes Saved</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-2">Reading Activity</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="h-20 flex items-center justify-center">
                      <div className="flex items-end w-full h-16 space-x-2">
                        {Array.from({ length: 12 }).map((_, i) => {
                          const height = Math.floor(Math.random() * 16) + 4;
                          return (
                            <div 
                              key={i} 
                              className="bg-primary-300 rounded-t-sm flex-grow" 
                              style={{ height: `${height}px` }}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Jan</span>
                      <span>Jun</span>
                      <span>Dec</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900">Similar Books</h2>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View More
                </a>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="book-card bg-gray-50 rounded-md overflow-hidden transition-all duration-300 hover:shadow-md">
                    <img 
                      src={`https://images.pexels.com/photos/${3568520 + i * 100}/pexels-photo-${3568520 + i * 100}.jpeg?auto=compress&cs=tinysrgb&w=800`} 
                      alt="Book cover" 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 text-sm line-clamp-1">Similar Book Title {i}</h3>
                      <p className="text-xs text-gray-600">Author Name</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">Reviews</h2>
              <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <PenSquare className="w-5 h-5 mr-2" />
                Write Review
              </button>
            </div>
            
            {showReviewForm && (
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="font-serif text-lg font-semibold mb-4">Your Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Your Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setUserRating(rating)}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={`w-8 h-8 ${userRating && rating <= userRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="review" className="block text-gray-700 mb-2">Your Review</label>
                    <textarea
                      id="review"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your thoughts about this book..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      rows={4}
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors duration-200"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {book.reviews.length > 0 ? (
              <div className="space-y-8">
                {book.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-8">
                    <div className="flex items-center mb-4">
                      <Link to={`/profile/${review.user.id}`} className="flex items-center group">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                          {review.user.profilePicture ? (
                            <img 
                              src={review.user.profilePicture} 
                              alt={review.user.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary-200 text-primary-700 font-medium">
                              {review.user.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors duration-200">
                            {review.user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {review.date.toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700">{review.text}</p>
                    
                    <div className="flex mt-4 space-x-4">
                      <button className="text-gray-500 hover:text-primary-500 text-sm font-medium">
                        Like
                      </button>
                      <button className="text-gray-500 hover:text-primary-500 text-sm font-medium">
                        Comment
                      </button>
                      <button className="text-gray-500 hover:text-primary-500 text-sm font-medium">
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="bg-gray-50 rounded-xl py-12 px-6">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Be the first to share your thoughts on this book!
                  </p>
                  <button 
                    onClick={() => setShowReviewForm(true)}
                    className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <PenSquare className="w-5 h-5 mr-2" />
                    Write a Review
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'quotes' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">Quotes</h2>
              <button className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                <PenSquare className="w-5 h-5 mr-2" />
                Add Quote
              </button>
            </div>
            
            {book.quotes.length > 0 ? (
              <div className="space-y-6">
                {book.quotes.map((quote) => (
                  <div key={quote.id} className="bg-gray-50 p-6 rounded-lg">
                    <blockquote className="italic text-lg text-gray-700 border-l-4 border-primary-300 pl-4 mb-4">
                      "{quote.text}"
                    </blockquote>
                    
                    <div className="flex justify-between items-center">
                      <Link to={`/profile/${quote.user.id}`} className="text-sm text-gray-600 hover:text-primary-600">
                        Shared by {quote.user.name}
                      </Link>
                      
                      <div className="flex space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200">
                          <Heart className="w-5 h-5 mr-1" />
                          <span>{quote.likes}</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-primary-500 transition-colors duration-200">
                          <Bookmark className="w-5 h-5" />
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-primary-500 transition-colors duration-200">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="bg-gray-50 rounded-xl py-12 px-6">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes shared yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Be the first to share a meaningful quote from this book!
                  </p>
                  <button className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                    <PenSquare className="w-5 h-5 mr-2" />
                    Add a Quote
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'clubs' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">Book Clubs</h2>
              <button className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                <Users className="w-5 h-5 mr-2" />
                Start a Club
              </button>
            </div>
            
            {book.clubs && book.clubs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {book.clubs.map((club) => (
                  <div key={club.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="relative h-32">
                      <img 
                        src={club.coverImage}
                        alt={club.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-serif font-semibold text-lg mb-2 text-gray-800">{club.name}</h3>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Users className="w-4 h-4 mr-1 text-primary-500" />
                        <span>{club.membersCount} members</span>
                      </div>
                      
                      <button className="w-full py-2 text-primary-600 font-medium bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200">
                        Join Discussion
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="bg-gray-50 rounded-xl py-12 px-6">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No book clubs for this book yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    Start a book club and invite others to discuss this book together!
                  </p>
                  <button className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                    <Users className="w-5 h-5 mr-2" />
                    Start a Book Club
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;