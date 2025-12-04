
import React from 'react';
import { Link } from '../components/SimpleRouter';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <header className="bg-gradient-to-r from-purple-500 to-violet-500 text-white py-20 text-center shadow-inner">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in">
          Amy's Crochet Assistant
        </h1>
        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto px-4 animate-fade-in delay-200">
          Master the art of crochet with comprehensive guides, techniques, and resources.
        </p>
      </header>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link to="/glossary" className="block group">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 border-l-4 border-purple-500 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">Glossary & Conversions</h2>
              <p className="text-gray-600">Quickly look up abbreviations and translate between US and UK terms.</p>
            </div>
          </Link>

          <Link to="/techniques" className="block group">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 border-l-4 border-emerald-500 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">Techniques & Stitches</h2>
              <p className="text-gray-600">Learn new stitches with step-by-step guides and video tutorials.</p>
            </div>
          </Link>

          <Link to="/yarn" className="block group">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 border-l-4 border-pink-500 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">Yarn Resources</h2>
              <p className="text-gray-600">Understand yarn weights, fibers, and find substitutions.</p>
            </div>
          </Link>

          <Link to="/planner" className="block group">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 border-l-4 border-blue-500 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">Crochet Projects</h2>
              <p className="text-gray-600">Track your projects, set goals, and link resources.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
