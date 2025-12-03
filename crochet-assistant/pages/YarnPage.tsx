import React from 'react';
import YarnWeightInfo from '../components/YarnWeightInfo';
import YarnTypesSection from '../components/YarnTypesSection';

const YarnPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col gap-8 pb-12">
      <YarnWeightInfo />
      <YarnTypesSection />
    </div>
  );
};

export default YarnPage;