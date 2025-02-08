import { useState, useEffect } from 'react';

export default function DisasterRecovery() {
  const [recoveryPoints, setRecoveryPoints] = useState([]);
  const [recoveryStatus, setRecoveryStatus] = useState('idle');

  useEffect(() => {
    const fetchRecoveryPoints = async () => {
      const response = await fetch('/disaster-recovery/points');
      const data = await response.json();
      setRecoveryPoints(data);
    };
    fetchRecoveryPoints();
  }, []);

  const handleRecovery = async (pointId) => {
    setRecoveryStatus('in-progress');
    const response = await fetch(`/disaster-recovery/restore/${pointId}`, {
      method: 'POST'
    });

    if (response.ok) {
      setRecoveryStatus('completed');
    } else {
      setRecoveryStatus('failed');
    }
  };

  return (
    <div className="disaster-recovery">
      <h2>Recuperação de Desastres</h2>
      
      <div className="recovery-status">
        <h3>Status da Recuperação:</h3>
        <span className={`status ${recoveryStatus}`}>{recoveryStatus}</span>
      </div>

      <div className="recovery-points">
        <h3>Pontos de Recuperação</h3>
        <table>
          <thead>
            <tr>
              <th>Ponto de Recuperação</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {recoveryPoints.map((point) => (
              <tr key={point.id}>
                <td>{new Date(point.recovery_point).toLocaleString()}</td>
                <td>{point.status}</td>
                <td>
                  <button
                    onClick={() => handleRecovery(point.id)}
                    disabled={recoveryStatus === 'in-progress'}
                  >
                    Restaurar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
