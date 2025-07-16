// src/types/CompanyQuestion.ts
export type CompanyQuestion = {
  id: number;
  company: string;
  question: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
};
