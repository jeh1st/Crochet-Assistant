import { useState, useEffect, useCallback } from 'react';
import { CROCHET_TECHNIQUES } from '../constants'; // Import to get initial technique IDs

const LOCAL_STORAGE_KEY = 'crochetAssistantProgress';

export const useProgressTracker = () => {
  const [learnedStatus, setLearnedStatus] = useState<Record<string, boolean>>(() => {
    // Create default status object with all current techniques set to false
    const initialStatus: Record<string, boolean> = {};
    CROCHET_TECHNIQUES.forEach(tech => {
      initialStatus[tech.id] = false;
    });

    try {
      const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        // Merge saved progress into initial status.
        // This ensures new techniques (not in storage) are present with false,
        // and existing learned status is preserved.
        return { ...initialStatus, ...parsedProgress };
      }
    } catch (error) {
      console.error("Failed to parse progress from localStorage:", error);
      // Fallback to initial status if parsing fails
    }
    
    return initialStatus;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(learnedStatus));
    } catch (error) {
      console.error("Failed to save progress to localStorage:", error);
    }
  }, [learnedStatus]);

  const toggleLearned = useCallback((techniqueId: string) => {
    setLearnedStatus(prevStatus => ({
      ...prevStatus,
      [techniqueId]: !prevStatus[techniqueId],
    }));
  }, []);

  return { learnedStatus, toggleLearned };
};
