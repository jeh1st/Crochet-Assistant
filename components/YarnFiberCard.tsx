
import React, { useState } from 'react';
import { YarnFiber } from '../types';

interface YarnFiberCardProps {
  fiber: YarnFiber;
}

const YarnFiberCard: React.FC<YarnFiberCardProps> = ({ fiber }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 text-left flex justify-between items-center focus:outline-none focus:bg-purple-50 transition-colors duration-150 bg-white text-gray-900"
        aria-expanded={isExpanded}
      >
        <span className="text-xl font-bold text-purple-900">{fiber.name}</span>
        <svg
            className={`w-6 h-6 text-purple-700 transform transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-5 border-t border-gray-100 bg-gray-50 animate-fade-in text-gray-900">
          <p className="text-gray-900 text-lg mb-5 leading-relaxed">{fiber.description}</p>
          
          <div className="mb-5">
            <h4 className="font-bold text-purple-800 mb-3 text-lg">Key Properties:</h4>
            <ul className="list-disc list-inside text-gray-800 pl-2 text-lg space-y-1">
              {fiber.properties.map((prop, i) => (
                <li key={i}>{prop}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-purple-800 mb-2 text-lg">Care Instructions:</h4>
            <p className="text-gray-800 text-lg italic">{fiber.careInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default YarnFiberCard;
