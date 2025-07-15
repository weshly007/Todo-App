import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import { CheckCircle, Circle, Target } from 'lucide-react';

const TodoStats = () => {
  const { stats } = useTodos();

  const statItems = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: Target,
      color: 'text-purple-400',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-400',
    },
    {
      label: 'Active',
      value: stats.active,
      icon: Circle,
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {statItems.map((item) => (
        <div key={item.label} className="glass-card p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <item.icon className={`h-6 w-6 ${item.color}`} />
            <div>
              <div className={`text-2xl font-bold ${item.color}`}>
                {item.value}
              </div>
              <div className="text-gray-400 text-sm">{item.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoStats;