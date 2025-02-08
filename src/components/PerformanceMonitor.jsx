import { useState, useEffect } from 'react';
import { LineChart, BarChart } from 'recharts';

export default function PerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState({
    responseTimes: [],
    statusCodes: []
  });

  useEffect(() => {
    const fetchPerformanceData = async () => {
      const response = await fetch('/performance/metrics');
      const data = await response.json();
      setPerformanceData(data);
    };

    fetchPerformanceData();
    const interval = setInterval(fetchPerformanceData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="performance-monitor">
      <h2>Monitoramento de Performance</h2>
      
      <div className="charts">
        <div className="chart">
          <h3>Tempo de Resposta</h3>
          <LineChart
            width={500}
            height={300}
            data={performanceData.responseTimes}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {/* Configurações do gráfico */}
          </LineChart>
        </div>

        <div className="chart">
          <h3>Códigos de Status</h3>
          <BarChart
            width={500}
            height={300}
            data={performanceData.statusCodes}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {/* Configurações do gráfico */}
          </BarChart>
        </div>
      </div>
    </div>
  );
}
