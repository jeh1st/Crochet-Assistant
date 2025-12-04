
import React, { useState, useEffect } from 'react';
import { useLocation } from './SimpleRouter';
import { Technique } from '../types';

interface TechniqueCardProps {
  technique: Technique;
  isLearned: boolean;
  onToggleLearn: (id: string) => void;
}

const MAX_DESCRIPTION_LENGTH = 180;

const TechniqueCard: React.FC<TechniqueCardProps> = ({ technique, isLearned, onToggleLearn }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isTargeted, setIsTargeted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === `#${technique.id}`) {
      setIsExpanded(true);
      setIsTargeted(true);
      // Remove highlight after a few seconds
      const timer = setTimeout(() => setIsTargeted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.hash, technique.id]);

  const handleToggleLearn = () => {
    onToggleLearn(technique.id);
  };

  const descriptionNeedsTruncation = technique.description.length > MAX_DESCRIPTION_LENGTH;
  const displayedDescription = showFullDescription || !descriptionNeedsTruncation
    ? technique.description
    : `${technique.description.substring(0, MAX_DESCRIPTION_LENGTH).trim()}...`;

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(technique.name + ' crochet tutorial')}`;

  return (
    <div
      id={technique.id}
      className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 
        ${isLearned ? 'border-4 border-emerald-500' : ''} 
        ${isTargeted ? 'ring-4 ring-purple-500 ring-offset-2' : ''}`}
      aria-labelledby={`technique-title-${technique.id}`}
    >
      {/* Header section - acts as the collapse/expand toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset hover:bg-purple-50 transition-colors duration-200"
        aria-expanded={isExpanded}
        aria-controls={`technique-content-${technique.id}`}
      >
        <div className="flex items-center min-w-0 pr-4 flex-1">
          <h3 id={`technique-title-${technique.id}`} className="text-xl md:text-2xl font-bold text-purple-800 mr-2">
            {technique.name}
          </h3>
          {isLearned && (
            <span className="ml-2 md:ml-4 text-emerald-600 text-base font-semibold flex items-center shrink-0" aria-label="Technique learned">
              <svg className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Learned!
            </span>
          )}
        </div>
        
        {/* Chevron icon to indicate state */}
        <svg className={`w-8 h-8 text-purple-700 transform transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible content area */}
      {isExpanded && (
        <div 
          id={`technique-content-${technique.id}`} 
          className="px-6 pb-6 animate-fade-in"
        >
          <p className="text-gray-800 mb-3 text-lg leading-relaxed">{displayedDescription}</p>

          {descriptionNeedsTruncation && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card from collapsing when clicking
                setShowFullDescription(!showFullDescription)
              }}
              className="text-purple-600 hover:text-purple-800 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 self-start mb-4"
              aria-controls={`technique-description-${technique.id}`}
              aria-expanded={showFullDescription}
            >
              {showFullDescription ? 'Read Less' : 'Read More'}
            </button>
          )}

          {/* "Mark as Learned" checkbox remains inside the collapsible area */}
          <div className="flex items-center my-5">
            <input
              type="checkbox"
              id={`learn-checkbox-${technique.id}`}
              checked={isLearned}
              onChange={handleToggleLearn}
              style={{ colorScheme: 'light' }}
              className="h-6 w-6 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer bg-white"
            />
            <label htmlFor={`learn-checkbox-${technique.id}`} className="ml-3 text-xl font-medium text-gray-900 cursor-pointer">
              Mark as Learned
            </label>
          </div>

          <div>
            <h4 className="text-xl font-bold text-purple-700 mb-3">Steps:</h4>
            {/* All steps are shown when expanded */}
            <ol className="list-decimal list-inside text-gray-700 space-y-3 text-lg">
              {technique.steps.map((step, index) => (
                <li key={index} className="leading-relaxed pl-2">{step}</li>
              ))}
            </ol>
          </div>
          
          {technique.hasVideoTutorial && (
            <div className="mt-8">
                <a 
                    href={youtubeSearchUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    aria-label={`Search YouTube for ${technique.name} tutorials`}
                >
                    <svg className="w-7 h-7 mr-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21.543 6.498C21.312 5.632 20.671 4.991 19.805 4.760C18.156 4.333 12 4.333 12 4.333C12 4.333 5.844 4.333 4.195 4.760C3.329 4.991 2.688 5.632 2.457 6.498C2.030 8.147 2.030 12 2.030 12C2.030 12 2.030 15.853 2.457 17.502C2.688 18.368 3.329 19.009 4.195 19.240C5.844 19.667 12 19.667 12 19.667C12 19.667 18.156 19.667 19.805 19.240C20.671 19.009 21.312 18.368 21.543 17.502C21.970 15.853 21.970 12 21.970 12C21.970 12 21.970 8.147 21.543 6.498ZM9.999 15.494V8.506L15.999 12L9.999 15.494Z"/>
                    </svg>
                    <span>Watch Tutorials on YouTube</span>
                </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TechniqueCard;
