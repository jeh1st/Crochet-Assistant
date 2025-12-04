
import React from 'react';
import { StitchCounter as StitchCounterType } from '../types';

interface StitchCounterProps {
  counter: StitchCounterType;
  onUpdate: (updatedCounter: StitchCounterType) => void;
  onDelete: (id: string) => void;
  colorClass?: string; // New prop for background color
}

const StitchCounter: React.FC<StitchCounterProps> = ({ counter, onUpdate, onDelete, colorClass = 'bg-white' }) => {
  const handleIncrement = () => {
    onUpdate({ ...counter, count: counter.count + counter.step });
  };

  const handleDecrement = () => {
    onUpdate({ ...counter, count: Math.max(0, counter.count - counter.step) });
  };

  const handleReset = () => {
    onUpdate({ ...counter, count: 0 });
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...counter, label: e.target.value });
  };

  const handleIncrementStep = () => {
    onUpdate({ ...counter, step: counter.step + 1 });
  };

  const handleDecrementStep = () => {
    onUpdate({ ...counter, step: Math.max(1, counter.step - 1) });
  };

  return (
    <div className={`${colorClass} border border-black/5 rounded-xl p-5 shadow-sm flex flex-col gap-4 transition-shadow hover:shadow-md`}>
      {/* Header: Label and Delete */}
      <div className="flex justify-between items-center border-b border-black/10 pb-3">
        <input
          type="text"
          value={counter.label}
          onChange={handleLabelChange}
          className="flex-grow bg-transparent text-xl font-semibold text-gray-900 focus:outline-none focus:border-b-2 focus:border-purple-500 transition-colors mr-4 placeholder-gray-500"
          placeholder="Counter Name"
          aria-label="Counter Name"
        />
        <button
          onClick={() => onDelete(counter.id)}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100/50 rounded-full transition-colors"
          title="Delete Counter"
          aria-label="Delete Counter"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Controls: Big Minus - Big Count - Big Plus */}
      <div className="flex items-center justify-between gap-4 py-2">
        <button
          onClick={handleDecrement}
          className="flex-none w-16 h-16 rounded-full bg-white/60 text-gray-700 hover:bg-white active:bg-white/80 flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-black/5 shadow-sm border border-black/5"
          aria-label="Decrease count"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
          </svg>
        </button>
        
        <div className="flex-grow text-center">
          <span className="text-6xl font-bold text-gray-900 tabular-nums block tracking-tight">
            {counter.count}
          </span>
        </div>

        <button
          onClick={handleIncrement}
          className="flex-none w-16 h-16 rounded-full bg-white/60 text-gray-900 hover:bg-white active:bg-white/80 flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-black/5 shadow-sm border border-black/5"
          aria-label="Increase count"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Footer: Step and Reset */}
      <div className="flex justify-between items-center pt-2 border-t border-black/10">
        <div className="flex items-center gap-3">
          <span className="text-base font-medium text-gray-600">Step:</span>
          <div className="flex items-center bg-white/60 rounded-full p-1 shadow-sm border border-black/5">
            <button
              onClick={handleDecrementStep}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-gray-700 transition-colors focus:outline-none active:bg-white/80"
              aria-label="Decrease step"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-8 text-center text-lg font-bold text-gray-900 tabular-nums">{counter.step}</span>
            <button
              onClick={handleIncrementStep}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-gray-900 transition-colors focus:outline-none active:bg-white/80"
              aria-label="Increase step"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-white/50 px-3 py-1.5 rounded transition-colors"
        >
          Reset Count
        </button>
      </div>
    </div>
  );
};

export default StitchCounter;
