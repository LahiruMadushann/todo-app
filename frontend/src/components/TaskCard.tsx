import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import type { Task } from '../types/task.types';

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => void;
  loading: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, loading }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 break-words">
            {task.title}
          </h3>
          
          {task.description && (
            <p className="text-gray-600 mb-3 whitespace-pre-wrap break-words">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center text-sm text-gray-400">
            <span>Created: {formatDate(task.createdAt)}</span>
          </div>
        </div>

        <button
          onClick={() => onComplete(task.id)}
          disabled={loading}
          className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed"
          title="Mark as completed"
        >
          <MdCheckCircle className="text-lg" />
          Done
        </button>
      </div>
    </div>
  );
};

export default TaskCard;