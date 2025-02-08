import { useEffect } from 'react';

export default function SellerDashboard() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'https://lp.zellify.online';
    }
  }, []);

  return (
    <div className="seller-dashboard">
      <h1>Seller Dashboard</h1>
      {/* Conteúdo do dashboard dos sellers */}
    </div>
  );
}
