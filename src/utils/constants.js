export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const PRIORITY_COLORS = {
  [PRIORITY_LEVELS.LOW]: 'bg-green-500',
  [PRIORITY_LEVELS.MEDIUM]: 'bg-yellow-500',
  [PRIORITY_LEVELS.HIGH]: 'bg-red-500'
};

export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

export const STORAGE_KEY = 'premium-todo-app-data';