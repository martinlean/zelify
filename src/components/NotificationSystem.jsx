import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function NotificationSystem() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(`/notifications?user_id=${user.id}`);
      const data = await response.json();
      setNotifications(data);
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [user.id]);

  return (
    <div className="notification-system">
      <h2>Notificações</h2>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <div className="notification-content">
              <p>{notification.message}</p>
              <small>{new Date(notification.created_at).toLocaleString()}</small>
            </div>
            {!notification.read && <div className="unread-badge" />}
          </div>
        ))}
      </div>
    </div>
  );
}
