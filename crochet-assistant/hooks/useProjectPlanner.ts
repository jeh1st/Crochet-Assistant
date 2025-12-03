
import { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const LOCAL_STORAGE_PROJECTS_KEY = 'crochetAssistantProjects';

export const useProjectPlanner = () => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const savedProjects = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY);
      if (savedProjects) {
        return JSON.parse(savedProjects) as Project[];
      }
    } catch (error) {
      console.error("Failed to parse projects from localStorage:", error);
    }
    return []; // Default to empty array if no saved projects or error
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error("Failed to save projects to localStorage:", error);
    }
  }, [projects]);

  const addProject = useCallback((newProjectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
  }, []);

  const updateProject = useCallback((projectId: string, updates: Partial<Project>) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  }, []);

  const deleteProject = useCallback((projectId: string) => {
    setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
  }, []);

  return { projects, addProject, updateProject, deleteProject };
};
