
import React, { useState, useEffect } from 'react';
import { useLocation } from './SimpleRouter';
import { YarnWeight } from '../types';

interface YarnWeightCardProps {
  weight: YarnWeight;
  onProjectClick: (projectName: string) => void;
}

const YarnWeightCard: React.FC<YarnWeightCardProps> = ({ weight, onProjectClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTargeted, setIsTargeted] = useState(false);
  const location = useLocation();
  const cardId = `category-${weight.category}`;

  useEffect(() => {
    if (location.hash === `#${cardId}`) {
      setIsExpanded(true);
      setIsTargeted(true);
      const timer = setTimeout(() => setIsTargeted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.hash, cardId]);

  return (
    <div
      id={cardId}
      className={`bg-white rounded-lg shadow-lg flex flex-col overflow-hidden transition-all duration-300 
        ${isTargeted ? 'ring-4 ring-purple-500 ring-offset-2' : ''}`}
      role="region"
      aria-labelledby={`yarn-weight-title-${weight.category}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-white hover:bg-purple-50 p-5 text-left flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset transition-colors duration-200"
        aria-expanded={isExpanded}
        aria-controls={`yarn-weight-content-${weight.category}`}
      >
        <h3 className="text-2xl font-bold text-purple-800" id={`yarn-weight-title-${weight.category}`}>
          <span className="block text-base uppercase tracking-wider font-medium text-purple-600 mb-1">Category {weight.category}</span>
          {weight.name}
        </h3>
        <svg
          className={`w-8 h-8 text-purple-700 transform transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div
          id={`yarn-weight-content-${weight.category}`}
          className="p-6 flex flex-col flex-grow animate-fade-in"
        >
          <div className="space-y-5 mb-6">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Gauge Range (4")</p>
              <p className="text-lg text-gray-900">{weight.gaugeRange}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Rec. Hook Size</p>
              <p className="text-lg text-gray-900">{weight.hookSize}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Description</p>
              <p className="text-gray-800 text-lg leading-relaxed">{weight.description}</p>
            </div>
          </div>
          <div className="mt-auto pt-5 border-t border-gray-200">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Example Projects</p>
            <div className="flex flex-wrap gap-3">
              {weight.exampleProjects.map((project, idx) => (
                <button
                  key={idx}
                  onClick={() => onProjectClick(project)}
                  className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  aria-label={`Search for ${project} crochet patterns`}
                  title={`Click to search for ${project} crochet patterns`}
                >
                  {project}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YarnWeightCard;
