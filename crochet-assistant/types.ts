


export interface Abbreviation {
  us: string;
  uk: string;
  description: string;
}

export interface ConversionEntry {
  us: string;
  uk: string;
  explanation: string;
}

export interface Technique {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  hasVideoTutorial?: boolean;
  steps: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface YarnWeight {
  category: string;
  name: string;
  gaugeRange: string;
  hookSize: string;
  description: string;
  exampleProjects: string[];
}

export interface YarnFiber {
  id: string;
  name: string;
  description: string;
  properties: string[];
  careInstructions: string;
}

export interface StitchCounter {
  id: string;
  label: string;
  count: number;
  step: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  goal?: string; // Made optional
  status: 'Not Started' | 'In Progress' | 'Completed';
  startDate: string;
  endDate?: string;
  notes?: string;
  linkedTechniques?: string[];
  linkedYarnWeight?: string[]; // Changed to array for multi-select
  yarnType?: string[]; // Changed to array for multi-select
  createdAt: string;
  yarnBrand?: string;
  colors?: string;
  hookSize?: string[]; // Changed to array for multi-select
  counters?: StitchCounter[];
}