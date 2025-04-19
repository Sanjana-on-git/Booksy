import React, { useState } from 'react';
import { Users, Search, Plus, Filter } from 'lucide-react';
import BookClubCard, { BookClub } from '../components/clubs/BookClubCard';

// Sample data (in a real app, this would come from Firebase)
const sampleBookClubs: BookClub[] = [
  {
    id: '1',
    name: 'Fantasy Book Lovers',
    description: 'A community for fans of fantasy literature, from epic high fantasy to urban fantasy.',
    coverImage: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800',
    membersCount: 328,
    currentBook: {
      id: '1',
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      coverImage: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    nextMeeting: new Date('2025-06-10'),
    category: 'Fantasy'
  },
  {
    id: '2',
    name: 'Science Fiction Explorers',
    description: 'Exploring the universe through science fiction books, from classics to new releases.',
    coverImage: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=800',
    membersCount: 245,
    currentBook: {
      id: '2',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      coverImage: 'https://images.pexels.com/photos/3432695/pexels-photo-3432695.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    nextMeeting: new Date('2025-06-15'),
    category: 'Science Fiction'
  },
  {
    id: '3',
    name: 'Mystery & Thriller Club',
    description: 'For readers who enjoy solving puzzles and getting thrilled by suspenseful narratives.',
    coverImage: 'https://images.pexels.com/photos/3700513/pexels-photo-3700513.jpeg?auto=compress&cs=tinysrgb&w=800',
    membersCount: 189,
    currentBook: {
      id: '3',
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      coverImage: 'https://images.pexels.com/photos/3700513/pexels-photo-3700513.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    nextMeeting: new Date('2025-06-08'),
    category: 'Mystery'
  },
  {
    id: '4',
    name: 'Literary Fiction Discussions',
    description: 'Deep discussions about contemporary and classic literary fiction.',
    coverImage: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800',
    membersCount: 132,
    currentBook: {
      id: '4',
      title: 'The Vanishing Half',
      author: 'Brit Bennett',
      coverImage: 'https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    nextMeeting: new Date('2025-06-20'),
    category: 'Literary Fiction'
  },
  {
    id: '5',
    name: 'Historical Fiction Time Travelers',
    description: 'Journey through time with historical fiction novels from various eras.',
    coverImage: 'https://images.pexels.com/photos/5959992/pexels-photo-5959992.jpeg?auto=compress&cs=tinysrgb&w=800',
    membersCount: 156,
    currentBook: {
      id: '5',
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      coverImage: 'https://images.pexels.com/photos/4153146/pexels-photo-4153146.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    nextMeeting: new Date('2025-06-25'),
    category: 'Historical Fiction'
  },
  {
    id: '6',
    name: 'Romance Readers',
    description: 'Celebrating love stories in all their forms, from contemporary to historical romance.',
    coverImage: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg?auto=compress&cs=tinysrgb&w=800',
    membersCount: 278,
    currentBook: {
      id: '6',
      title: 'Beach Read',
      author: 'Emily Henry',
      coverImage: 'https://images.pexels.com/photos/5864245/pexels-photo-5864245.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    nextMeeting: new Date('2025-06-12'),
    category: 'Romance'
  },
];

const categories = [
  'All Categories',
  'Fantasy',
  'Science Fiction',
  'Mystery',
  'Literary Fiction',
  'Historical Fiction',
  'Romance',
  'Thriller',
  'Non-Fiction',
  'Biography',
  'Self-Help',
];

const BookClubs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filteredClubs, setFilteredClubs] = useState(sampleBookClubs);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterClubs(term, selectedCategory);
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterClubs(searchTerm, category);
  };
  
  const filterClubs = (term: string, category: string) => {
    let filtered = sampleBookClubs;
    
    if (term) {
      filtered = filtered.filter(club => 
        club.name.toLowerCase().includes(term.toLowerCase()) || 
        club.description.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    if (category !== 'All Categories') {
      filtered = filtered.filter(club => club.category === category);
    }
    
    setFilteredClubs(filtered);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Book Clubs</h1>
          <p className="text-gray-600">Join discussions with fellow book lovers</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
            <Plus className="w-5 h-5 mr-2" />
            Create Club
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search book clubs..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
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

      {/* My Clubs */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center">
            <Users className="text-primary-500 mr-3" />
            My Book Clubs
          </h2>
          <a href="#" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            View All
          </a>
        </div>
        
        {/* Placeholder for when user has no clubs */}
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">You haven't joined any clubs yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Join a book club to discuss your favorite books with other readers or create your own!
          </p>
          <button className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
            <Plus className="w-5 h-5 mr-2" />
            Join Your First Club
          </button>
        </div>
      </div>

      {/* Explore Clubs */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Explore Book Clubs</h2>
        
        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map(club => (
              <BookClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="bg-gray-50 rounded-xl py-12 px-6">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No book clubs found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Try adjusting your search or filter criteria, or create a new club!
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                <Plus className="w-5 h-5 mr-2" />
                Create a Book Club
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookClubs;