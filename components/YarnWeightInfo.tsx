import React from 'react';
import { YARN_WEIGHTS } from '../constants';
import SectionTitle from './SectionTitle';
import YarnSubstitutionTool from './YarnSubstitutionTool';
import YarnWeightCard from './YarnWeightCard'; // New import

const YarnWeightInfo: React.FC = () => {
  const handleProjectClick = (projectName: string) => {
    const searchQuery = `${projectName} crochet pattern`;
    // Opens a new tab with a Google search for the project patterns
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank', 'noopener noreferrer');
  };

  return (
    <section id="yarn-weights" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle id="yarn-weights" title="Understanding Yarn Weights" />
        <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto text-center">
          Yarn weight refers to the thickness of the yarn strand. Selecting the correct yarn weight and hook size is crucial for achieving the desired look and drape of your crochet project.
        </p>

        <YarnSubstitutionTool />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {YARN_WEIGHTS.map((weight) => (
            <YarnWeightCard
              key={weight.category}
              weight={weight}
              onProjectClick={handleProjectClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YarnWeightInfo;
