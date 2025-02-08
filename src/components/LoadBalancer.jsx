import { useState, useEffect } from 'react';

export default function LoadBalancer() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      const response = await fetch('/load-balancer/servers');
      const data = await response.json();
      setServers(data);
    };

    fetchServers();
    const interval = setInterval(fetchServers, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="load-balancer">
      <h2>Balanceamento de Carga</h2>
      
      <div className="servers-list">
        <table>
          <thead>
            <tr>
              <th>Servidor</th>
              <th>Status</th>
              <th>Requisições</th>
              <th>Última Verificação</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server) => (
              <tr key={server.id}>
                <td>{server.server_name}</td>
                <td className={`status ${server.status}`}>{server.status}</td>
                <td>{server.request_count}</td>
                <td>{new Date(server.last_check).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
