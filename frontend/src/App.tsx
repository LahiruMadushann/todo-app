import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchTasks, createTask, completeTask, clearError, clearSuccessMessage } from './store/slices/taskSlice';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Alert from './components/Alert';
import Loading from './components/Loading';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error, successMessage } = useAppSelector((state) => state.tasks);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = async (title: string, description: string) => {
    try {
      await dispatch(createTask({ title, description })).unwrap();
      setShowForm(false);
      dispatch(fetchTasks());
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleCompleteTask = async (id: number) => {
    try {
      await dispatch(completeTask(id)).unwrap();
    } catch (err) {
      console.error('Failed to complete task:', err);
    }
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  const handleCloseSuccess = () => {
    dispatch(clearSuccessMessage());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            My Todo List
          </h1>
          <p className="text-gray-600 text-lg">
            Keep track of your tasks and stay organized
          </p>
        </div>

        {/* Alerts */}
        <div className="mb-6 space-y-3">
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={handleCloseError}
            />
          )}
          {successMessage && (
            <Alert
              type="success"
              message={successMessage}
              onClose={handleCloseSuccess}
            />
          )}
        </div>

        {/* Add Task Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium text-lg"
            >
              <MdAdd className="text-2xl" />
              Add New Task
            </button>
          ) : (
            <TaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowForm(false)}
              loading={loading}
            />
          )}
        </div>

        {/* Task List */}
        {loading && tasks.length === 0 ? (
          <Loading />
        ) : (
          <>
            <TaskList
              tasks={tasks}
              onComplete={handleCompleteTask}
              loading={loading}
            />

            {/* Task Count */}
            {tasks.length > 0 && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{tasks.length}</span> of 5 most recent incomplete tasks
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;