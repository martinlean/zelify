import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SecurityAudit() {
  const { user } = useAuth();
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      const response = await fetch(`/security/audit?user_id=${user.id}`);
      const data = await response.json();
      setAuditLogs(data);
    };
    fetchAuditLogs();
  }, [user.id]);

  return (
    <div className="security-audit">
      <h2>Auditoria de Segurança</h2>
      
      <div className="audit-logs">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Ação</th>
              <th>Detalhes</th>
              <th>IP</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id}>
                <td>{new Date(log.created_at).toLocaleString()}</td>
                <td>{log.action}</td>
                <td>{log.details}</td>
                <td>{log.ip_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
