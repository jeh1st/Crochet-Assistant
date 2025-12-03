
import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import SectionTitle from '../components/SectionTitle';

const FeedbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
       <div className="container mx-auto px-4">
        <SectionTitle id="feedback" title="App Feedback" />
        <FeedbackForm />
      </div>
    </div>
  );
};

export default FeedbackPage;
