import { useState, useEffect } from 'react';

export default function AutoScalingSystem() {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    requests: 0
  });
  const [scalingHistory, setScalingHistory] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await fetch('/scaling/metrics');
      const data = await response.json();
      setMetrics(data);
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchScalingHistory = async () => {
      const response = await fetch('/scaling/history');
      const data = await response.json();
      setScalingHistory(data);
    };
    fetchScalingHistory();
  }, []);

  return (
    <div className="auto-scaling-system">
      <h2>Sistema de Escalabilidade Automática</h2>
      
      <div className="current-metrics">
        <h3>Métricas Atuais</h3>
        <div className="metric">
          <span>Uso de CPU:</span>
          <progress value={metrics.cpu} max="100" />
          <span>{metrics.cpu.toFixed(2)}%</span>
        </div>
        <div className="metric">
          <span>Uso de Memória:</span>
          <progress value={metrics.memory} max="100" />
          <span>{metrics.memory.toFixed(2)}%</span>
        </div>
        <div className="metric">
          <span>Requisições por Segundo:</span>
          <span>{metrics.requests}</span>
        </div>
      </div>

      <div className="scaling-history">
        <h3>Histórico de Escalabilidade</h3>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Ação</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {scalingHistory.map((entry) => (
              <tr key={entry.id}>
                <td>{new Date(entry.created_at).toLocaleString()}</td>
                <td>{entry.action}</td>
                <td>{entry.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
