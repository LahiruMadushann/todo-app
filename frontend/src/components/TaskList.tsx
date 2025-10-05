import React from 'react';
import { MdAssignment } from 'react-icons/md';
import TaskCard from './TaskCard';
import type { Task } from '../types/task.types';

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: number) => void;
  loading: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, loading }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <MdAssignment className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-500">
          Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onComplete}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default TaskList;