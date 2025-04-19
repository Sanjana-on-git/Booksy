import React, { useState } from 'react';
import { Search, MapPin, Filter, RefreshCw, Plus } from 'lucide-react';
import SwapCard, { SwapBook } from '../components/swaps/SwapCard';

// Sample data (in a real app, this would come from Firebase)
const sampleSwapBooks: SwapBook[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.pexels.com/photos/1629355/pexels-photo-1629355.jpeg?auto=compress&cs=tinysrgb&w=800',
    condition: 'Like New',
    user: {
      id: '1',
      name: 'Emily Johnson',
      location: 'Brooklyn, NY'
    },
    description: 'Only read once, like new condition. Perfect for anyone who loves thought-provoking fiction.',
    genres: ['Fiction', 'Fantasy'],
    listedDate: new Date('2023-05-15'),
    type: 'Swap'
  },
  {
    id: '2',
    title: 'Educated',
    author: 'Tara Westover',
    coverImage: 'https://images.pexels.com/photos/4238488/pexels-photo-4238488.jpeg?auto=compress&cs=tinysrgb&w=800',
    condition: 'Good',
    user: {
      id: '2',
      name: 'Michael Chen',
      location: 'Austin, TX'
    },
    genres: ['Memoir', 'Biography'],
    listedDate: new Date('2023-05-10'),
    type: 'Giveaway'
  },
  {
    id: '3',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    coverImage: 'https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?auto=compress&cs=tinysrgb&w=800',
    condition: 'Good',
    user: {
      id: '3',
      name: 'Sophia Martinez',
      location: 'Chicago, IL'
    },
    description: 'Beautiful story, some minor wear on the corners but otherwise in great condition.',
    genres: ['Fiction', 'Mythology'],
    listedDate: new Date('2023-05-12'),
    type: 'Swap'
  },
  {
    id: '4',
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    coverImage: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800',
    condition: 'Well-loved',
    user: {
      id: '4',
      name: 'James Wilson',
      location: 'Seattle, WA'
    },
    description: 'This book has been read multiple times and has some wear. Still perfectly readable.',
    genres: ['Fiction', 'Contemporary'],
    listedDate: new Date('2023-05-08'),
    type: 'Giveaway'
  },
  {
    id: '5',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://images.pexels.com/photos/3432695/pexels-photo-3432695.jpeg?auto=compress&cs=tinysrgb&w=800',
    condition: 'Like New',
    user: {
      id: '5',
      name: 'Alex Thompson',
      location: 'Denver, CO'
    },
    genres: ['Science Fiction', 'Space'],
    listedDate: new Date('2023-05-18'),
    type: 'Swap'
  },
  {
    id: '6',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    coverImage: 'https://images.pexels.com/photos/4153146/pexels-photo-4153146.jpeg?auto=compress&cs=tinysrgb&w=800',
    condition: 'Fair',
    user: {
      id: '6',
      name: 'Olivia Davis',
      location: 'Portland, OR'
    },
    genres: ['Fiction', 'Historical'],
    listedDate: new Date('2023-05-05'),
    type: 'Swap'
  },
];

const SwapShelf: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [filteredBooks, setFilteredBooks] = useState(sampleSwapBooks);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterBooks(term, selectedType, selectedCondition);
  };
  
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    filterBooks(searchTerm, type, selectedCondition);
  };
  
  const handleConditionChange = (condition: string) => {
    setSelectedCondition(condition);
    filterBooks(searchTerm, selectedType, condition);
  };
  
  const filterBooks = (term: string, type: string, condition: string) => {
    let filtered = sampleSwapBooks;
    
    if (term) {
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(term.toLowerCase()) || 
        book.author.toLowerCase().includes(term.toLowerCase()) ||
        (book.description && book.description.toLowerCase().includes(term.toLowerCase()))
      );
    }
    
    if (type !== 'All') {
      filtered = filtered.filter(book => book.type === type);
    }
    
    if (condition !== 'All') {
      filtered = filtered.filter(book => book.condition === condition);
    }
    
    setFilteredBooks(filtered);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Swap Shelf</h1>
          <p className="text-gray-600">Find new homes for your books and discover pre-loved titles</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
            <Plus className="w-5 h-5 mr-2" />
            List a Book
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search books by title, author..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <RefreshCw className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 appearance-none"
            >
              <option value="All">All Types</option>
              <option value="Swap">Swap</option>
              <option value="Giveaway">Giveaway</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCondition}
              onChange={(e) => handleConditionChange(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 appearance-none"
            >
              <option value="All">All Conditions</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Well-loved">Well-loved</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Location Search - Simplified for demo */}
      <div className="bg-secondary-50 border border-secondary-200 rounded-xl p-4 mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-secondary-600 mr-2" />
          <span className="text-secondary-800 font-medium">Books near: </span>
          <span className="ml-2 text-gray-700">New York, NY</span>
        </div>
        <button className="text-secondary-700 hover:text-secondary-800 text-sm font-medium">
          Change Location
        </button>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <SwapCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="bg-gray-50 rounded-xl py-12 px-6">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria, or list your own book!
            </p>
            <button className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
              <Plus className="w-5 h-5 mr-2" />
              List a Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapShelf;