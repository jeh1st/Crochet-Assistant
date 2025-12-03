import React from 'react';

interface OnboardingTutorialProps {
  isVisible: boolean;
  onDismiss: () => void;
}

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ isVisible, onDismiss }) => {
  if (!isVisible) {
    return null;
  }

  const features = [
    {
      title: 'Glossary & Conversions',
      description: 'Quickly look up US and UK crochet terms and easily translate patterns.',
      icon: (
        <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Techniques & Stitches',
      description: 'Learn with step-by-step guides, illustrations, and videos. Mark your progress as you go!',
      icon: (
        <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5 5.754 5 4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18c1.746 0 3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Yarn Weights Explained',
      description: 'Understand different yarn types and their ideal uses.',
      icon: (
        <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Project Planner',
      description: 'Create and manage your crochet projects, track progress, and link relevant app resources!',
      icon: (
        <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
    >
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
           style={{ animationFillMode: 'forwards' }}> {/* Added inline style to ensure animation stays at end state */}
        <h2 id="tutorial-title" className="text-4xl font-extrabold text-purple-700 mb-6 text-center">
          Welcome to Amy's Crochet Assistant!
        </h2>
        <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
          Embark on your crochet journey or deepen your skills with our comprehensive guide. Here's a quick overview of what you'll find:
        </p>

        <ul className="space-y-6 mb-10">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 mt-1 mr-3">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <button
            onClick={onDismiss}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-200 text-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
            aria-label="Start Crocheting, dismiss tutorial"
          >
            Start Crocheting!
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTutorial;
