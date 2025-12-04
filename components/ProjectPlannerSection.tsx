

import React, { useState, useMemo } from 'react';
import SectionTitle from './SectionTitle';
import { useProjectPlanner } from '../hooks/useProjectPlanner';
import ProjectCard from './ProjectCard';
import ProjectFormModal from './ProjectFormModal';
import { Project } from '../types';

type ProjectStatusFilter = Project['status'] | 'All';
const statusFilters: ProjectStatusFilter[] = ['All', 'Not Started', 'In Progress', 'Completed'];

const ProjectPlannerSection: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjectPlanner();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<ProjectStatusFilter>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // 'desc' for newest first

  const openModalForNewProject = () => {
    setEditingProject(undefined);
    setIsModalOpen(true);
  };

  const openModalForEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = (projectData: Project | Omit<Project, 'id' | 'createdAt'>) => {
    if ((projectData as Project).id) {
      updateProject((projectData as Project).id, projectData);
    } else {
      addProject(projectData as Omit<Project, 'id' | 'createdAt'>);
    }
  };

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;
    if (filterStatus !== 'All') {
      filtered = projects.filter(project => project.status === filterStatus);
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [projects, filterStatus, sortOrder]);

  return (
    <section id="project-planner" className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <SectionTitle id="project-planner" title="Crochet Projects" />
        <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto text-center">
          Organize your crochet journey! Create projects, set goals, track progress, and link to helpful techniques and yarn information within the app.
        </p>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <button
            onClick={openModalForNewProject}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            aria-label="Add a new crochet project"
          >
            <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Project
          </button>

          <div className="flex items-center space-x-4">
            <label htmlFor="filterStatus" className="sr-only">Filter by Status</label>
            <select
              id="filterStatus"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ProjectStatusFilter)}
              className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              aria-label="Filter projects by status"
            >
              {statusFilters.map(status => (
                <option key={status} value={status}>{status} Projects</option>
              ))}
            </select>

            <label htmlFor="sortOrder" className="sr-only">Sort Order</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              aria-label="Sort projects by creation date"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {filteredAndSortedProjects.length === 0 ? (
          <p className="text-center text-xl text-gray-600 py-10">
            {filterStatus === 'All'
              ? 'No projects added yet. Click "Add New Project" to get started!'
              : `No projects found with status "${filterStatus}".`
            }
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={openModalForEditProject}
                onDelete={deleteProject}
                onProjectUpdate={updateProject}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        currentProject={editingProject}
      />
    </section>
  );
};

export default ProjectPlannerSection;