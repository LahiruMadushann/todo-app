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
      dispatch(fetchTasks());
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
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Section - Add Task Form */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 lg:sticky lg:top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {showForm ? 'Add a Task' : 'Create New Task'}
              </h2>
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
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
          </div>

          {/* Right Section - Task List */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Tasks
                </h2>
                {tasks.length > 0 && (
                  <span className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                  </span>
                )}
              </div>

              {loading && tasks.length === 0 ? (
                <Loading />
              ) : tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks yet</h3>
                  <p className="text-gray-500 text-sm">Create your first task to get started!</p>
                </div>
              ) : (
                <>
                  <TaskList
                    tasks={tasks}
                    onComplete={handleCompleteTask}
                    loading={loading}
                  />

                  {/* Task Count */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                      Showing <span className="font-semibold">{tasks.length}</span> of 5 most recent incomplete tasks
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;