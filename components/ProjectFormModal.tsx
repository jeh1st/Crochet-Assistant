
import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { CROCHET_TECHNIQUES, YARN_WEIGHTS, YARN_FIBERS, CROCHET_HOOK_SIZES } from '../constants';
import MultiSelectDropdown from './MultiSelectDropdown';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project | Omit<Project, 'id' | 'createdAt'>) => void;
  currentProject?: Project; // For editing existing projects
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ isOpen, onClose, onSave, currentProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [status, setStatus] = useState<'Not Started' | 'In Progress' | 'Completed'>('Not Started');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [yarnBrand, setYarnBrand] = useState('');
  const [colors, setColors] = useState('');
  const [hookSize, setHookSize] = useState<string[]>([]);
  const [linkedTechniques, setLinkedTechniques] = useState<string[]>([]);
  const [linkedYarnWeight, setLinkedYarnWeight] = useState<string[]>([]);
  const [yarnType, setYarnType] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      // Reset form or populate for editing
      if (currentProject) {
        setName(currentProject.name);
        setDescription(currentProject.description);
        setGoal(currentProject.goal || '');
        setStatus(currentProject.status);
        setStartDate(currentProject.startDate);
        setEndDate(currentProject.endDate || '');
        setNotes(currentProject.notes || '');
        setYarnBrand(currentProject.yarnBrand || '');
        setColors(currentProject.colors || '');
        
        // Handle backward compatibility where hookSize might be a string
        const hookData = currentProject.hookSize;
        setHookSize(Array.isArray(hookData) ? hookData : (hookData ? [hookData] : []));
        
        setLinkedTechniques(currentProject.linkedTechniques || []);
        
        // Handle backward compatibility where these might be single strings
        const weightData = currentProject.linkedYarnWeight;
        setLinkedYarnWeight(Array.isArray(weightData) ? weightData : (weightData ? [weightData] : []));
        
        const typeData = currentProject.yarnType;
        setYarnType(Array.isArray(typeData) ? typeData : (typeData ? [typeData] : []));

      } else {
        // Reset for new project
        setName('');
        setDescription('');
        setGoal('');
        setStatus('Not Started');
        setStartDate(new Date().toISOString().slice(0, 10)); // Default to today
        setEndDate('');
        setNotes('');
        setYarnBrand('');
        setColors('');
        setHookSize([]);
        setLinkedTechniques([]);
        setLinkedYarnWeight([]);
        setYarnType([]);
      }
      setErrors({}); // Clear errors on open
    }
  }, [isOpen, currentProject]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Project name is required.';
    // Goal is no longer required
    if (!startDate) newErrors.startDate = 'Start date is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);

    // Automatically set status to Completed if end date is provided and status is not Completed.
    // We removed window.confirm to avoid "Access denied" errors in strict iframe environments.
    if (newEndDate && status !== 'Completed') {
        setStatus('Completed');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const projectData: Project | Omit<Project, 'id' | 'createdAt'> = {
      name,
      description,
      goal: goal || undefined,
      status,
      startDate,
      endDate: status === 'Completed' && endDate ? endDate : undefined,
      notes: notes || undefined,
      yarnBrand: yarnBrand || undefined,
      colors: colors || undefined,
      hookSize: hookSize.length > 0 ? hookSize : undefined,
      linkedTechniques: linkedTechniques.length > 0 ? linkedTechniques : undefined,
      linkedYarnWeight: linkedYarnWeight.length > 0 ? linkedYarnWeight : undefined,
      yarnType: yarnType.length > 0 ? yarnType : undefined,
      counters: currentProject?.counters, // Preserve existing counters
      ...(currentProject && { id: currentProject.id, createdAt: currentProject.createdAt }),
    };
    onSave(projectData);
    onClose();
  };

  if (!isOpen) return null;

  // Map constants to Option format for MultiSelectDropdown
  const yarnWeightOptions = YARN_WEIGHTS.map(w => ({ id: w.name, label: `Category ${w.category}: ${w.name}` }));
  const yarnFiberOptions = YARN_FIBERS.map(f => ({ id: f.name, label: f.name }));
  const techniqueOptions = CROCHET_TECHNIQUES.map(t => ({ id: t.id, label: t.name }));
  const hookSizeOptions = CROCHET_HOOK_SIZES.map(h => ({ id: h, label: h }));

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-form-title"
    >
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
           style={{ animationFillMode: 'forwards' }}>
        <h2 id="project-form-title" className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
          {currentProject ? 'Edit Project' : 'Add New Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="projectName"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              aria-required="true"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="projectDescription"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              rows={2}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label htmlFor="projectGoal" className="block text-sm font-medium text-gray-700">Purpose/Goal</label>
            <input
              type="text"
              id="projectGoal"
              value={goal}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGoal(e.target.value)}
              placeholder="e.g., Gift for Mom, Personal Use"
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label htmlFor="yarnBrand" className="block text-sm font-medium text-gray-700">Yarn Brand/Name</label>
               <input
                 type="text"
                 id="yarnBrand"
                 value={yarnBrand}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYarnBrand(e.target.value)}
                 placeholder="e.g. Red Heart"
                 className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
               />
             </div>
             <div>
               <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Color(s)</label>
               <input
                 type="text"
                 id="colors"
                 value={colors}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColors(e.target.value)}
                 placeholder="e.g. Blue, Teal"
                 className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
               />
             </div>
          </div>
          
          <div>
             <MultiSelectDropdown
                label="Hook Size(s) Used"
                options={hookSizeOptions}
                selectedIds={hookSize}
                onChange={setHookSize}
                placeholder="Select Hook Sizes"
              />
          </div>

          <div>
            <label htmlFor="projectStatus" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="projectStatus"
              value={status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as 'Not Started' | 'In Progress' | 'Completed')}
              className="mt-1 block w-full bg-white pl-3 pr-10 py-2 text-base text-gray-900 border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectStartDate" className="block text-sm font-medium text-gray-700">Start Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                id="projectStartDate"
                value={startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                style={{ colorScheme: 'light' }}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                aria-required="true"
              />
              {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
            </div>
            {/* Always show End Date field, but it might affect status */}
            <div>
              <label htmlFor="projectEndDate" className="block text-sm font-medium text-gray-700">Completion Date</label>
              <input
                type="date"
                id="projectEndDate"
                value={endDate}
                onChange={handleEndDateChange}
                style={{ colorScheme: 'light' }}
                className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="projectNotes" className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="projectNotes"
              value={notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <MultiSelectDropdown
                label="Yarn Type(s)"
                options={yarnFiberOptions}
                selectedIds={yarnType}
                onChange={setYarnType}
                placeholder="Select Fiber Types"
              />
              <MultiSelectDropdown
                label="Linked Yarn Weight(s)"
                options={yarnWeightOptions}
                selectedIds={linkedYarnWeight}
                onChange={setLinkedYarnWeight}
                placeholder="Select Yarn Weights"
              />
          </div>

          <div>
             <MultiSelectDropdown
                label="Linked Techniques"
                options={techniqueOptions}
                selectedIds={linkedTechniques}
                onChange={setLinkedTechniques}
                placeholder="Select Techniques"
              />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
