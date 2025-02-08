import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ActivityMonitor() {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch(`/activity?user_id=${user.id}`);
      const data = await response.json();
      setActivities(data);
    };
    fetchActivities();
  }, [user.id]);

  return (
    <div className="activity-monitor">
      <h2>Monitoramento de Atividades</h2>
      
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-header">
              <span className="type">{activity.activity_type}</span>
              <span className="date">
                {new Date(activity.created_at).toLocaleString()}
              </span>
            </div>
            <p className="details">{activity.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
