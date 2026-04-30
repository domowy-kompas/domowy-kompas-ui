import { type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import type { Notification } from '../../types/notifications';
import './Notifications.css';

interface ToastContainerProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export function ToastContainer({ notifications, removeNotification }: ToastContainerProps): ReactElement {
  return createPortal(
    <div className="toast-container">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>,
    document.body
  );
}
