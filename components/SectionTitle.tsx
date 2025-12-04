
import React from 'react';

interface SectionTitleProps {
  id: string;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ id, title }) => {
  return (
    <h2 id={id} className="text-4xl font-extrabold text-purple-700 mb-8 pt-4 md:pt-8 scroll-mt-20">
      {title}
    </h2>
  );
};

export default SectionTitle;
