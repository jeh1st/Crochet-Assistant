
import React from 'react';
import { YARN_FIBERS } from '../constants';
import SectionTitle from './SectionTitle';
import YarnFiberCard from './YarnFiberCard';

const YarnTypesSection: React.FC = () => {
  return (
    <section id="yarn-types" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle id="yarn-types" title="Common Yarn Fibers" />
        <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto text-center">
          Understanding fiber content is key to choosing the right yarn for your project. Here is a guide to the most common types.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {YARN_FIBERS.map((fiber) => (
            <YarnFiberCard key={fiber.id} fiber={fiber} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YarnTypesSection;
