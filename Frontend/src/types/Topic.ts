export interface Topic {
  id: number;
  name: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Not Started' | 'In Progress' | 'Completed';
  isFavorite: boolean;
  notes?: string;
    userId?: string;
    completedDate?: string;
    isBookmarked: boolean;
   }
