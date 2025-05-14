export type Subject = {
  id: string;
  name: string;
  color?: string;
};

export type StudySession = {
  id: string;
  subject: Subject;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  type: 'pomodoro' | 'continuous';
  completed: boolean;
};

export const defaultSubjects: Subject[] = [
  { id: '1', name: 'Matemática', color: 'bg-blue-500' },
  { id: '2', name: 'Português', color: 'bg-green-500' },
  { id: '3', name: 'História', color: 'bg-yellow-500' },
  { id: '4', name: 'Geografia', color: 'bg-purple-500' },
  { id: '5', name: 'Física', color: 'bg-red-500' },
  { id: '6', name: 'Química', color: 'bg-pink-500' },
  { id: '7', name: 'Biologia', color: 'bg-indigo-500' },
  { id: '8', name: 'Inglês', color: 'bg-orange-500' },
]; 