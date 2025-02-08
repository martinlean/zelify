import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function PushNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: ''
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(`/notifications?user_id=${user.id}`);
      const data = await response.json();
      setNotifications(data);
    };
    fetchNotifications();
  }, [user.id]);

  const handleSendNotification = async () => {
    const response = await fetch('/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        ...newNotification
      })
    });

    if (response.ok) {
      const notification = await response.json();
      setNotifications([...notifications, notification]);
      setNewNotification({ title: '', message: '' });
    }
  };

  return (
    <div className="push-notifications">
      <h2>Notificações Push</h2>
      
      <div className="notification-form">
        <input
          type="text"
          placeholder="Título"
          value={newNotification.title}
          onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
        />
        <textarea
          placeholder="Mensagem"
          value={newNotification.message}
          onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
        />
        <button onClick={handleSendNotification}>Enviar</button>
      </div>

      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
            <small>
              {new Date(notification.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
