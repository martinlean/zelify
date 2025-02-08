import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function RewardsSystem() {
  const { user } = useAuth();
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    const fetchRewards = async () => {
      const response = await fetch(`/rewards?user_id=${user.id}`);
      const data = await response.json();
      setRewards(data);
    };
    fetchRewards();
  }, [user.id]);

  return (
    <div className="rewards-system">
      <h2>Sistema de Recompensas</h2>
      
      {rewards && (
        <div className="rewards-dashboard">
          <div className="stats">
            <div>
              <h3>Pontos</h3>
              <p>{rewards.points}</p>
            </div>
            <div>
              <h3>Nível</h3>
              <p>{rewards.level}</p>
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(rewards.points % 1000) / 10}%` }}
            />
          </div>

          <div className="actions">
            <h3>Ganhe Pontos</h3>
            <ul>
              <li>Comprar produtos (+100 pontos)</li>
              <li>Avaliar produtos (+50 pontos)</li>
              <li>Convidar amigos (+200 pontos)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
