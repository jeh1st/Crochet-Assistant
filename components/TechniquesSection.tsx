
import React, { useState, useMemo } from 'react';
import { CROCHET_TECHNIQUES } from '../constants';
import TechniqueCard from './TechniqueCard';
import SectionTitle from './SectionTitle';
import { useProgressTracker } from '../hooks/useProgressTracker';
import { Technique } from '../types';

const difficultyLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const;
type DifficultyLevel = typeof difficultyLevels[number];

type Terminology = 'US' | 'UK';

const convertTextToUK = (text: string): string => {
  // Regex to match US terms. Longer phrases must come first to avoid partial matches.
  const pattern = /\b(half double crochet|single crochet|double crochet|treble crochet|yarn over|hdc|sc|dc|tr|yo)\b/gi;

  return text.replace(pattern, (match) => {
    const lower = match.toLowerCase();
    let replacement = match;

    switch (lower) {
      case 'single crochet': replacement = 'double crochet'; break;
      case 'double crochet': replacement = 'treble crochet'; break;
      case 'half double crochet': replacement = 'half treble crochet'; break;
      case 'treble crochet': replacement = 'double treble crochet'; break;
      case 'yarn over': replacement = 'yarn round hook'; break;
      case 'sc': replacement = 'dc'; break;
      case 'dc': replacement = 'tr'; break;
      case 'hdc': replacement = 'htr'; break;
      case 'tr': replacement = 'dtr'; break;
      case 'yo': replacement = 'yrh'; break;
      default: return match;
    }

    // Preserve casing
    if (match === match.toUpperCase()) return replacement.toUpperCase();
    if (match[0] === match[0].toUpperCase()) {
        // Title case/Sentence case
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }
    return replacement;
  });
};

const TechniquesSection: React.FC = () => {
  const { learnedStatus, toggleLearned } = useProgressTracker();
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('All');
  const [terminology, setTerminology] = useState<Terminology>('US');

  const filteredTechniques = useMemo(() => {
    let techniques = CROCHET_TECHNIQUES;

    if (selectedDifficulty !== 'All') {
      techniques = techniques.filter(
        (technique: Technique) => technique.difficulty === selectedDifficulty
      );
    }

    // Convert to UK terminology if selected
    if (terminology === 'UK') {
      return techniques.map(tech => ({
        ...tech,
        name: convertTextToUK(tech.name).replace('US Terminology', 'UK Terminology'),
        description: convertTextToUK(tech.description),
        steps: tech.steps.map(step => convertTextToUK(step))
      }));
    }

    return techniques;
  }, [selectedDifficulty, terminology]);

  return (
    <section id="techniques" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle id="techniques" title="Crochet Techniques & Stitches" />

        {/* Controls Container */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
          
          {/* Terminology Toggle */}
          <div className="flex items-center bg-white p-2 rounded-full shadow-sm border border-gray-200">
            <span className={`px-3 text-sm font-bold transition-colors duration-200 ${terminology === 'US' ? 'text-purple-700' : 'text-gray-400'}`}>US Terms</span>
            <button
              onClick={() => setTerminology(prev => prev === 'US' ? 'UK' : 'US')}
              className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${terminology === 'UK' ? 'bg-purple-600' : 'bg-gray-300'}`}
              role="switch"
              aria-checked={terminology === 'UK'}
              aria-label="Toggle between US and UK terminology"
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${terminology === 'UK' ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <span className={`px-3 text-sm font-bold transition-colors duration-200 ${terminology === 'UK' ? 'text-purple-700' : 'text-gray-400'}`}>UK Terms</span>
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {difficultyLevels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ease-in-out
                  ${selectedDifficulty === level
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                aria-pressed={selectedDifficulty === level}
                aria-label={`Filter techniques by ${level} difficulty`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechniques.length > 0 ? (
            filteredTechniques.map((technique) => (
              <TechniqueCard 
                key={technique.id} 
                technique={technique}
                isLearned={learnedStatus[technique.id] || false}
                onToggleLearn={toggleLearned}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-xl text-gray-600">
              No techniques found for "{selectedDifficulty}" difficulty.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechniquesSection;
