import { useState, useEffect } from 'react';

export default function AutoBackupSystem() {
  const [backups, setBackups] = useState([]);
  const [settings, setSettings] = useState({
    frequency: 'daily',
    storage: 'local'
  });

  useEffect(() => {
    const fetchBackups = async () => {
      const response = await fetch('/backups');
      const data = await response.json();
      setBackups(data);
    };
    fetchBackups();
  }, []);

  const handleBackupNow = async () => {
    const response = await fetch('/backups/create', {
      method: 'POST'
    });

    if (response.ok) {
      const backup = await response.json();
      setBackups([...backups, backup]);
    }
  };

  const handleSettingsChange = async () => {
    await fetch('/backups/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
  };

  return (
    <div className="auto-backup-system">
      <h2>Sistema de Backup Automático</h2>
      
      <div className="backup-controls">
        <button onClick={handleBackupNow}>Fazer Backup Agora</button>
        
        <div className="settings">
          <h3>Configurações</h3>
          <div className="setting">
            <label>Frequência:</label>
            <select
              value={settings.frequency}
              onChange={(e) => setSettings({ ...settings, frequency: e.target.value })}
            >
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
            </select>
          </div>
          <div className="setting">
            <label>Armazenamento:</label>
            <select
              value={settings.storage}
              onChange={(e) => setSettings({ ...settings, storage: e.target.value })}
            >
              <option value="local">Local</option>
              <option value="cloud">Nuvem</option>
            </select>
          </div>
          <button onClick={handleSettingsChange}>Salvar Configurações</button>
        </div>
      </div>

      <div className="backups-list">
        <h3>Backups Realizados</h3>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Tamanho</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {backups.map((backup) => (
              <tr key={backup.id}>
                <td>{new Date(backup.created_at).toLocaleString()}</td>
                <td>{backup.size}</td>
                <td>{backup.status}</td>
                <td>
                  <a href={`/backups/download/${backup.id}`} download>
                    Baixar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
