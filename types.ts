export enum Language {
  Tamil = 'Tamil',
  English = 'English',
  Hindi = 'Hindi',
  Malayalam = 'Malayalam',
  Telugu = 'Telugu'
}

export enum Classification {
  AI_GENERATED = 'AI_GENERATED',
  HUMAN = 'HUMAN',
  UNKNOWN = 'UNKNOWN'
}

export interface AnalysisResult {
  status: 'success' | 'error';
  language: Language;
  classification: Classification;
  confidenceScore: number;
  explanation: string;
  features: {
    pitchStability: number;
    jitter: number;
    shimmer: number;
    spectralConsistency: number;
  };
}

export type Tab = 'dashboard' | 'architecture' | 'api-docs';

export interface CodeFile {
  name: string;
  language: string;
  content: string;
  description: string;
}