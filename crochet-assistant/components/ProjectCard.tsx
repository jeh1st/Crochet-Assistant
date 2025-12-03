
import React, { useState } from 'react';
import { useNavigate } from './SimpleRouter';
import { Project, StitchCounter as StitchCounterType } from '../types';
import { CROCHET_TECHNIQUES, YARN_WEIGHTS } from '../constants';
import StitchCounter from './StitchCounter';
import { v4 as uuidv4 } from 'uuid';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onProjectUpdate?: (projectId: string, updates: Partial<Project>) => void;
}

const COUNTER_COLORS = [
  'bg-red-100', 'bg-orange-100', 'bg-amber-100', 'bg-yellow-100', 
  'bg-lime-100', 'bg-green-100', 'bg-emerald-100', 'bg-teal-100', 
  'bg-cyan-100', 'bg-sky-100', 'bg-blue-100', 'bg-indigo-100', 
  'bg-violet-100', 'bg-purple-100', 'bg-fuchsia-100', 'bg-pink-100', 'bg-rose-100'
];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete, onProjectUpdate }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusBadgeClass = (status: Project['status']) => {
    switch (status) {
      case 'Not Started':
        return 'bg-gray-200 text-gray-800';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800';
      case 'Completed':
        return 'bg-emerald-200 text-emerald-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getTechniqueName = (id: string) => {
    const technique = CROCHET_TECHNIQUES.find(tech => tech.id === id);
    return technique ? technique.name : id;
  };

  const getYarnCategory = (name: string) => {
    const weight = YARN_WEIGHTS.find(w => w.name === name);
    return weight ? weight.category : null;
  };

  const ensureArray = (item: string | string[] | undefined): string[] => {
    if (!item) return [];
    return Array.isArray(item) ? item : [item];
  };

  // Helper to format date from YYYY-MM-DD to MM-DD-YYYY
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${month}-${day}-${year}`;
  };

  const linkedYarnWeights = ensureArray(project.linkedYarnWeight);
  const yarnTypes = ensureArray(project.yarnType);
  const hookSizes = ensureArray(project.hookSize);

  // Stitch Counter Handlers
  const handleAddCounter = () => {
    if (!onProjectUpdate) return;
    const newCounter: StitchCounterType = {
      id: uuidv4(),
      label: 'New Counter',
      count: 0,
      step: 1
    };
    const updatedCounters = [...(project.counters || []), newCounter];
    onProjectUpdate(project.id, { counters: updatedCounters });
  };

  const handleUpdateCounter = (updatedCounter: StitchCounterType) => {
    if (!onProjectUpdate) return;
    const updatedCounters = (project.counters || []).map(c => 
      c.id === updatedCounter.id ? updatedCounter : c
    );
    onProjectUpdate(project.id, { counters: updatedCounters });
  };

  const handleDeleteCounter = (counterId: string) => {
    if (!onProjectUpdate) return;
    const updatedCounters = (project.counters || []).filter(c => c.id !== counterId);
    onProjectUpdate(project.id, { counters: updatedCounters });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(project.id);
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(false);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(project);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-purple-800">{project.name}</h3>
        <span className={`px-3 py-1 rounded-full text-base font-semibold ${getStatusBadgeClass(project.status)}`}
              aria-label={`Project status: ${project.status}`}>
          {project.status}
        </span>
      </div>
      <p className="text-gray-800 text-lg mb-4 flex-grow">{project.description}</p>
      
      <div className="text-base text-gray-700 mb-6 space-y-2">
        {project.goal && <p><strong className="text-gray-900">Purpose/Goal:</strong> {project.goal}</p>}
        <p><strong className="text-gray-900">Started:</strong> {formatDate(project.startDate)}</p>
        {project.status === 'Completed' && project.endDate && (
          <p><strong className="text-gray-900">Completed:</strong> {formatDate(project.endDate)}</p>
        )}
        {project.yarnBrand && <p><strong className="text-gray-900">Yarn Brand/Name:</strong> {project.yarnBrand}</p>}
        {project.colors && <p><strong className="text-gray-900">Color(s):</strong> {project.colors}</p>}
        {hookSizes.length > 0 && (
          <p><strong className="text-gray-900">Hook Size(s):</strong> {hookSizes.join(', ')}</p>
        )}
        {yarnTypes.length > 0 && (
          <p><strong className="text-gray-900">Yarn Type(s):</strong> {yarnTypes.join(', ')}</p>
        )}
        {linkedYarnWeights.length > 0 && (
          <p><strong className="text-gray-900">Yarn Weight(s):</strong> {linkedYarnWeights.join(', ')}</p>
        )}
        {project.notes && (
          <p><strong className="text-gray-900">Notes:</strong> {project.notes}</p>
        )}
      </div>
      
      {/* Stitch Counters Section */}
      <div className="mb-6 border-t border-gray-100 pt-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-bold text-purple-800">Stitch Counters</p>
          {onProjectUpdate && (
            <button 
              type="button"
              onClick={handleAddCounter}
              className="text-base bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium hover:bg-purple-200 transition-colors flex items-center"
            >
              <span className="mr-1 text-xl leading-none font-bold">+</span> Add
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {project.counters && project.counters.map((counter, index) => (
            <StitchCounter 
              key={counter.id}
              counter={counter}
              onUpdate={handleUpdateCounter}
              onDelete={handleDeleteCounter}
              colorClass={COUNTER_COLORS[index % COUNTER_COLORS.length]}
            />
          ))}
          {(!project.counters || project.counters.length === 0) && (
            <div className="text-center py-6 text-gray-500 text-base italic border border-dashed border-gray-200 rounded-lg bg-gray-50">
              No counters added yet.
            </div>
          )}
        </div>
      </div>

      {(project.linkedTechniques && project.linkedTechniques.length > 0) || linkedYarnWeights.length > 0 ? (
        <div className="mb-4 border-t border-gray-100 pt-4">
          <p className="text-base font-semibold text-purple-700 mb-2">Linked Resources:</p>
          <div className="flex flex-wrap gap-2">
            {project.linkedTechniques && project.linkedTechniques.map(techId => (
              <button
                type="button"
                key={techId}
                onClick={() => navigate(`/techniques#${techId}`)}
                className="inline-flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label={`View technique: ${getTechniqueName(techId)}`}
                title={`View technique: ${getTechniqueName(techId)}`}
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5 5.754 5 4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18c1.746 0 3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                {getTechniqueName(techId)}
              </button>
            ))}
            {linkedYarnWeights.map((weightName, idx) => {
               const cat = getYarnCategory(weightName);
               return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => navigate(cat ? `/yarn#category-${cat}` : '/yarn')}
                  className="inline-flex items-center px-3 py-1.5 bg-violet-100 text-violet-800 rounded-full text-sm font-medium hover:bg-violet-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                  aria-label={`View yarn weight: ${weightName}`}
                  title={`View yarn weight: ${weightName}`}
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  {weightName}
                </button>
               );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-auto flex justify-end space-x-3 pt-6 border-t border-gray-100">
        {isDeleting ? (
            <>
                <span className="text-base text-gray-600 self-center mr-2">Are you sure?</span>
                <button
                    type="button"
                    onClick={handleCancelDelete}
                    className="px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 text-base font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Yes, Delete
                </button>
            </>
        ) : (
            <>
                <button
                type="button"
                onClick={handleEditClick}
                className="px-5 py-2 text-base font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                aria-label={`Edit project ${project.name}`}
                >
                Edit
                </button>
                <button
                type="button"
                onClick={handleDeleteClick}
                className="px-5 py-2 text-base font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                aria-label={`Delete project ${project.name}`}
                >
                Delete
                </button>
            </>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
