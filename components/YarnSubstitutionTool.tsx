
import React, { useState, useMemo } from 'react';
import { YARN_WEIGHTS } from '../constants';
import { YarnWeight } from '../types';
import MultiSelectDropdown from './MultiSelectDropdown';

const YarnSubstitutionTool: React.FC = () => {
  const [showTool, setShowTool] = useState(false);
  const [selectedYarnWeightCategories, setSelectedYarnWeightCategories] = useState<string[]>([]);
  const [fiberContentKeyword, setFiberContentKeyword] = useState<string>('');
  const [suggestedSubstitutions, setSuggestedSubstitutions] = useState<YarnWeight[]>([]);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const availableYarnCategories = useMemo(() => {
    const categories = new Set<string>();
    YARN_WEIGHTS.forEach(yarn => categories.add(yarn.category));
    return Array.from(categories).sort((a, b) => parseInt(a) - parseInt(b));
  }, []);

  const yarnWeightOptions = useMemo(() => {
      return availableYarnCategories.map(cat => {
          const yarn = YARN_WEIGHTS.find(y => y.category === cat);
          return { id: cat, label: `Category ${cat}: ${yarn?.name || ''}` };
      });
  }, [availableYarnCategories]);

  const findSubstitutions = () => {
    setSearchAttempted(true);

    if (selectedYarnWeightCategories.length === 0) {
      setSuggestedSubstitutions([]);
      return;
    }

    // Find substitutions for ALL selected categories
    let filteredSubstitutions = YARN_WEIGHTS.filter(
      (yarn) => selectedYarnWeightCategories.includes(yarn.category)
    );

    // Apply fiber filter logic primarily to visually highlight or filter, 
    // but here we use it to filter the specific yarn weight entries if needed.
    if (fiberContentKeyword.trim()) {
      const lowerCaseKeyword = fiberContentKeyword.toLowerCase();
      // We still show the category, but maybe we can filter display logic later.
      // For now, let's filter the matches.
      filteredSubstitutions = filteredSubstitutions.filter(yarn =>
        yarn.name.toLowerCase().includes(lowerCaseKeyword) ||
        yarn.description.toLowerCase().includes(lowerCaseKeyword) ||
        yarn.exampleProjects.some(project => project.toLowerCase().includes(lowerCaseKeyword))
      );
    }

    setSuggestedSubstitutions(filteredSubstitutions);
  };

  const resetForm = () => {
    setSelectedYarnWeightCategories([]);
    setFiberContentKeyword('');
    setSuggestedSubstitutions([]);
    setSearchAttempted(false);
  };

  // Logic for strand holding substitutions
  const getStrandSubstitutions = (category: string): string[] => {
    switch (category) {
      case '0': return []; 
      case '1': return ['2 strands of Lace (0)'];
      case '2': return ['2 strands of Lace (0) (Loose)', '1 strand of Lace (0) + 1 strand of Super Fine (1)']; 
      case '3': return ['2 strands of Super Fine (1) (Fingering)'];
      case '4': return ['2 strands of Fine (2) (Sport)', '1 strand of Light (3) + 1 strand of Super Fine (1)'];
      case '5': return ['2 strands of Light (3) (DK)', '3 strands of Super Fine (1)'];
      case '6': return ['2 strands of Medium (4) (Worsted)', '3 strands of Light (3) (DK)'];
      case '7': return ['2 strands of Super Bulky (6)', '4 strands of Medium (4)'];
      default: return [];
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-gray-900 border-2 border-purple-100">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-bold text-purple-700">Yarn Substitution Calculator</h3>
          <p className="text-sm text-gray-500">Find substitute yarns or calculate strand combinations.</p>
        </div>
        <button
          onClick={() => setShowTool(!showTool)}
          className="px-4 py-2 bg-purple-100 text-purple-700 font-semibold rounded-md hover:bg-purple-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          aria-expanded={showTool}
          aria-controls="yarn-substitution-panel"
        >
          {showTool ? 'Close Tool' : 'Open Tool'}
        </button>
      </div>

      {showTool && (
        <div id="yarn-substitution-panel" className="mt-6 animate-fade-in">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
            <p className="text-gray-900 font-medium mb-4">
              Select the weight called for in your pattern to see substitution options.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                 <MultiSelectDropdown
                  label="Target Yarn Weight"
                  options={yarnWeightOptions}
                  selectedIds={selectedYarnWeightCategories}
                  onChange={setSelectedYarnWeightCategories}
                  placeholder="Select Target Weight..."
                 />
                {searchAttempted && selectedYarnWeightCategories.length === 0 && (
                  <p className="text-red-500 text-sm mt-2 font-medium">Please select at least one target weight.</p>
                )}
              </div>
              <div>
                <label htmlFor="fiberContentKeyword" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Fiber (Optional)
                </label>
                <input
                  type="text"
                  id="fiberContentKeyword"
                  value={fiberContentKeyword}
                  onChange={(e) => setFiberContentKeyword(e.target.value)}
                  placeholder="e.g., wool, cotton, acrylic"
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={resetForm}
                className="px-5 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Clear
              </button>
              <button
                onClick={findSubstitutions}
                className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-base font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Find Substitutes
              </button>
            </div>
          </div>

          {searchAttempted && suggestedSubstitutions.length > 0 && (
            <div className="space-y-6">
              {suggestedSubstitutions.map((yarn, index) => {
                const strandSubs = getStrandSubstitutions(yarn.category);
                
                return (
                  <div key={index} className="bg-white border-2 border-purple-100 rounded-lg p-6 shadow-sm">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 border-b pb-2">
                      Options for substituting <span className="text-purple-700">{yarn.name} (Category {yarn.category})</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                      {/* Option 1: Direct Swap */}
                      <div>
                        <div className="flex items-center mb-3">
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wide mr-2">Option 1</span>
                          <h5 className="text-lg font-bold text-gray-800">Direct Substitution</h5>
                        </div>
                        <p className="text-gray-700 mb-2">Use any yarn labeled <strong>Category {yarn.category} ({yarn.name})</strong>.</p>
                        {fiberContentKeyword && (
                           <p className="text-gray-700 mb-2">
                             Look for: <strong>{fiberContentKeyword}</strong> blends in this weight.
                           </p>
                        )}
                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                          <p><strong>Target Gauge:</strong> {yarn.gaugeRange}</p>
                          <p><strong>Rec. Hook:</strong> {yarn.hookSize}</p>
                        </div>
                      </div>

                      {/* Option 2: Strand Holding */}
                      <div>
                        <div className="flex items-center mb-3">
                          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wide mr-2">Option 2</span>
                          <h5 className="text-lg font-bold text-gray-800">Strand Holding Math</h5>
                        </div>
                        <p className="text-gray-700 mb-3">Create a custom substitute by holding multiple strands of thinner yarn together:</p>
                        
                        {strandSubs.length > 0 ? (
                          <ul className="space-y-2">
                            {strandSubs.map((sub, idx) => (
                              <li key={idx} className="flex items-start">
                                <svg className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-800 font-medium">{sub}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                           <p className="text-gray-500 italic">No common multi-strand formulas available for this weight (it is likely too thin).</p>
                        )}
                        <p className="text-xs text-gray-500 mt-3 italic">
                          *Always crochet a gauge swatch to verify size when using multiple strands.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {searchAttempted && suggestedSubstitutions.length === 0 && selectedYarnWeightCategories.length > 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-4">
              <p className="text-lg text-gray-600">
                No matching yarn weights found. Try removing the fiber filter.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YarnSubstitutionTool;
