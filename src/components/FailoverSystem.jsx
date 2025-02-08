import { useState, useEffect } from 'react';

export default function FailoverSystem() {
  const [failoverLogs, setFailoverLogs] = useState([]);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [logsRes, serversRes] = await Promise.all([
        fetch('/failover/logs'),
        fetch('/failover/servers')
      ]);
      
      const logsData = await logsRes.json();
      const serversData = await serversRes.json();
      
      setFailoverLogs(logsData);
      setServers(serversData);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="failover-system">
      <h2>Sistema de Failover</h2>
      
      <div className="servers-status">
        <h3>Status dos Servidores</h3>
        <table>
          <thead>
            <tr>
              <th>Servidor</th>
              <th>Status</th>
              <th>Última Verificação</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server) => (
              <tr key={server.id}>
                <td>{server.server_name}</td>
                <td className={`status ${server.status}`}>{server.status}</td>
                <td>{new Date(server.last_check).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="failover-logs">
        <h3>Logs de Failover</h3>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Servidor</th>
              <th>Ação</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {failoverLogs.map((log) => (
              <tr key={log.id}>
                <td>{new Date(log.created_at).toLocaleString()}</td>
                <td>{log.server_name}</td>
                <td>{log.action}</td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
