import React, { useState } from 'react';
import { Search, Filter, Quote, BookOpen, Plus } from 'lucide-react';
import QuoteCard, { Quote as QuoteType } from '../components/quotes/QuoteCard';

// Sample data (in a real app, this would come from Firebase)
const sampleQuotes: QuoteType[] = [
  {
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
  },
  {
    id: '2',
    text: "That's the thing about books. They let you travel without moving your feet.",
    book: {
      id: '2',
      title: 'The Namesake',
      author: 'Jhumpa Lahiri',
      coverImage: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800'
    },
    user: {
      id: '2',
      name: 'Michael Chen'
    },
    likes: 18,
    comments: 2,
    createdAt: new Date('2023-06-10')
  },
  {
    id: '3',
    text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    book: {
      id: '3',
      title: 'A Dance with Dragons',
      author: 'George R.R. Martin',
      coverImage: 'https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    user: {
      id: '3',
      name: 'Sophia Martinez'
    },
    likes: 42,
    comments: 5,
    createdAt: new Date('2023-06-05')
  },
  {
    id: '4',
    text: "I declare after all there is no enjoyment like reading! How much sooner one tires of any thing than of a book!",
    book: {
      id: '4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      coverImage: 'https://images.pexels.com/photos/4238488/pexels-photo-4238488.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    user: {
      id: '4',
      name: 'James Wilson'
    },
    likes: 31,
    comments: 7,
    createdAt: new Date('2023-06-01')
  },
  {
    id: '5',
    text: "Books are a uniquely portable magic.",
    book: {
      id: '5',
      title: 'On Writing',
      author: 'Stephen King',
      coverImage: 'https://images.pexels.com/photos/3432695/pexels-photo-3432695.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    user: {
      id: '5',
      name: 'Alex Thompson'
    },
    likes: 16,
    comments: 1,
    createdAt: new Date('2023-05-28')
  },
];

const QuoteFeed: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [quotes, setQuotes] = useState(sampleQuotes);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term === '') {
      setQuotes(sampleQuotes);
    } else {
      const filtered = sampleQuotes.filter(quote => 
        quote.text.toLowerCase().includes(term.toLowerCase()) || 
        quote.book.title.toLowerCase().includes(term.toLowerCase()) ||
        quote.book.author.toLowerCase().includes(term.toLowerCase())
      );
      setQuotes(filtered);
    }
  };
  
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    
    // In a real app, we would fetch different quotes based on the filter
    // For demo purposes, we'll just use the sample quotes for all filters
    setQuotes(sampleQuotes);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Quote Catcher</h1>
          <p className="text-gray-600">Discover and share your favorite book quotes</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
            <Plus className="w-5 h-5 mr-2" />
            Add Quote
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search quotes, books, or authors..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Quotes
            </button>
            <button
              onClick={() => handleFilterChange('popular')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'popular'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => handleFilterChange('saved')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'saved'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Saved
            </button>
          </div>
        </div>
      </div>

      {/* My Collection */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center">
            <Quote className="text-primary-500 mr-3" />
            My Collection
          </h2>
          <a href="#" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            View All
          </a>
        </div>
        
        {/* Placeholder for when user has no quotes */}
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your quote collection is empty</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Start saving your favorite quotes from books you're reading!
          </p>
          <button className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Quote
          </button>
        </div>
      </div>

      {/* Quote Feed */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Discover Quotes</h2>
        
        {quotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotes.map(quote => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="bg-gray-50 rounded-xl py-12 px-6">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Try adjusting your search or add your own quote!
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                <Plus className="w-5 h-5 mr-2" />
                Add a Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteFeed;