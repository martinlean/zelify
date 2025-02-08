import { useEffect } from 'react';

export default function MemberArea() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'https://lp.zellify.online';
    }
  }, []);

  return (
    <div className="member-area">
      <h1>Member Area</h1>
      {/* Conteúdo da área dos membros */}
    </div>
  );
}
