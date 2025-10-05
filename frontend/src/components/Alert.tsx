import React, { useEffect } from 'react';
import { MdClose, MdError, MdCheckCircle } from 'react-icons/md';

interface AlertProps {
  type: 'error' | 'success';
  message: string;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const Alert: React.FC<AlertProps> = ({ 
  type, 
  message, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const styles = {
    error: {
      container: 'bg-red-50 border-red-400 text-red-800',
      icon: <MdError className="text-red-500 text-xl" />,
    },
    success: {
      container: 'bg-green-50 border-green-400 text-green-800',
      icon: <MdCheckCircle className="text-green-500 text-xl" />,
    },
  };

  return (
    <div className={`border-l-4 p-4 rounded-lg shadow-md ${styles[type].container} animate-slide-down`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {styles[type].icon}
          </div>
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <MdClose className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Alert;