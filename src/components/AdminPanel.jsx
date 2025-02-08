import { useEffect } from 'react';

export default function AdminPanel() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'https://lp.zellify.online';
    }
  }, []);

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      {/* Conteúdo do painel de administração */}
    </div>
  );
}
