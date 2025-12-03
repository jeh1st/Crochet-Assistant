
import React, { useState, useMemo } from 'react';
import { COMMON_ABBREVIATIONS } from '../constants';
import SectionTitle from './SectionTitle';

const CrochetGlossarySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAbbreviations = useMemo(() => {
    if (!searchTerm.trim()) {
      return COMMON_ABBREVIATIONS;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return COMMON_ABBREVIATIONS.filter(abbr =>
      abbr.us.toLowerCase().includes(lowerCaseSearchTerm) ||
      abbr.uk.toLowerCase().includes(lowerCaseSearchTerm) ||
      abbr.description.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm]);

  return (
    <section id="crochet-glossary" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle id="crochet-glossary" title="Glossary & Conversions" />
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto text-center">
          A comprehensive and searchable reference for common crochet abbreviations and US to UK stitch conversions.
        </p>

        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search abbreviations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 w-full bg-white border border-gray-300 rounded-full shadow-sm text-gray-900 text-lg focus:ring-purple-500 focus:border-purple-500"
              aria-label="Search crochet glossary"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Abbreviations Table */}
        <h3 className="text-3xl font-bold text-purple-700 mb-6 mt-10">Common Crochet Abbreviations</h3>
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white mb-12">
          {filteredAbbreviations.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-100">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-purple-800 uppercase tracking-wider">
                    US Abbr.
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-purple-800 uppercase tracking-wider">
                    UK Abbr.
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-purple-800 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAbbreviations.map((abbr, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-5 whitespace-nowrap text-base font-semibold text-gray-900">{abbr.us}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-base text-gray-800">{abbr.uk}</td>
                    <td className="px-6 py-5 text-base text-gray-800">{abbr.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-xl text-gray-600 py-10">No abbreviations found matching your search.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CrochetGlossarySection;
