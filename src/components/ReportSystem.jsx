import { useState, useEffect } from 'react';

export default function ReportSystem() {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    type: 'sales',
    parameters: {}
  });

  useEffect(() => {
    const fetchReports = async () => {
      const response = await fetch('/reports');
      const data = await response.json();
      setReports(data);
    };
    fetchReports();
  }, []);

  const handleGenerateReport = async () => {
    const response = await fetch('/reports/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReport)
    });

    if (response.ok) {
      const report = await response.json();
      setReports([...reports, report]);
    }
  };

  return (
    <div className="report-system">
      <h2>Sistema de Relatórios</h2>
      
      <div className="report-form">
        <select
          value={newReport.type}
          onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
        >
          <option value="sales">Vendas</option>
          <option value="users">Usuários</option>
          <option value="activities">Atividades</option>
        </select>
        <button onClick={handleGenerateReport}>Gerar Relatório</button>
      </div>

      <div className="reports-list">
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Gerado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.type}</td>
                <td>{new Date(report.generated_at).toLocaleString()}</td>
                <td>
                  <a href={`/reports/download/${report.id}`} download>
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
