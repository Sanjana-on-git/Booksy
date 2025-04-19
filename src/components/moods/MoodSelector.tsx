import React from 'react';
import { motion } from 'framer-motion';

interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

interface MoodSelectorProps {
  onSelectMood: (mood: Mood) => void;
}

const moods: Mood[] = [
  { id: 'happy', name: 'Happy', emoji: '😊', color: 'bg-yellow-100 hover:bg-yellow-200' },
  { id: 'sad', name: 'Sad', emoji: '😢', color: 'bg-blue-100 hover:bg-blue-200' },
  { id: 'romantic', name: 'Romantic', emoji: '❤️', color: 'bg-red-100 hover:bg-red-200' },
  { id: 'adventurous', name: 'Adventurous', emoji: '🚀', color: 'bg-green-100 hover:bg-green-200' },
  { id: 'cozy', name: 'Cozy', emoji: '☕', color: 'bg-amber-100 hover:bg-amber-200' },
  { id: 'curious', name: 'Curious', emoji: '🔍', color: 'bg-purple-100 hover:bg-purple-200' },
  { id: 'inspired', name: 'Inspired', emoji: '✨', color: 'bg-indigo-100 hover:bg-indigo-200' },
  { id: 'scary', name: 'Scary', emoji: '👻', color: 'bg-gray-100 hover:bg-gray-200' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelectMood }) => {
  return (
    <div className="py-3">
      <h3 className="text-lg font-serif font-semibold mb-4 text-gray-800">How are you feeling today?</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            onClick={() => onSelectMood(mood)}
            className={`${mood.color} rounded-xl p-3 flex flex-col items-center justify-center transition-colors duration-200 hover:shadow-md`}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-3xl mb-1">{mood.emoji}</span>
            <span className="font-medium text-gray-700">{mood.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;