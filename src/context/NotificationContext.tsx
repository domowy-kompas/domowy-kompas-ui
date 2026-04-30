/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useMemo, type ReactNode, type ReactElement } from 'react';
import { ToastContainer } from '../components/Notifications/ToastContainer';
import type { Notification, NotificationType } from '../types/notifications';

interface NotificationContextValue {
  showNotification: (message: string, type?: NotificationType, duration?: number, link?: { label: string; to: string }) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }): ReactElement {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showNotification = useCallback(
    (message: string, type: NotificationType = 'info', duration = 5000, link?: { label: string; to: string }) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newNotification: Notification = { id, message, type, duration, link };
      
      setNotifications((prev) => [...prev, newNotification]);
    },
    []
  );

  const value = useMemo(
    () => ({
      showNotification,
      removeNotification,
    }),
    [showNotification, removeNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
