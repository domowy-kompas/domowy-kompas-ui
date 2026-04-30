import { type ReactElement, useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { NotificationType } from '../../types/notifications';
import './Notifications.css';

interface ToastProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
  duration?: number;
}

const ICONS = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  info: <Info size={20} />,
  warning: <AlertTriangle size={20} />,
};

export function Toast({ message, type, onClose, duration = 5000 }: ToastProps): ReactElement {
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsRemoving(true);
    setTimeout(onClose, 300); // Wait for animation
  };

  return (
    <div className={`toast toast-${type} ${isRemoving ? 'removing' : ''}`} role="alert">
      <div className="toast-icon">
        {ICONS[type]}
      </div>
      <div className="toast-message">
        {message}
      </div>
      <button className="toast-close" onClick={handleClose} aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
}
