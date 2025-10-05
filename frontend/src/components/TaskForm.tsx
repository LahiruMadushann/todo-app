import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
  loading: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    
    if (title.length > 200) {
      setTitleError('Title must be less than 200 characters');
      return;
    }

    onSubmit(title, description);
    setTitle('');
    setDescription('');
    setTitleError('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) setTitleError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className={`w-full px-4 py-2 border ${
            titleError ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors`}
          placeholder="Enter task title"
          disabled={loading}
          maxLength={200}
        />
        {titleError && (
          <p className="mt-1 text-sm text-red-500">{titleError}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-colors"
          placeholder="Enter task description (optional)"
          rows={3}
          disabled={loading}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="flex-1 bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Task'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors font-medium disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <MdClose className="text-lg" />
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;