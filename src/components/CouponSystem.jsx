import { useState, useEffect } from 'react';

export default function CouponSystem() {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount_type: 'percentage',
    discount_value: 0,
    valid_from: '',
    valid_until: '',
    usage_limit: null
  });

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await fetch('/coupons');
      const data = await response.json();
      setCoupons(data);
    };
    fetchCoupons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCoupon)
    });

    if (response.ok) {
      const coupon = await response.json();
      setCoupons([...coupons, coupon]);
      setNewCoupon({
        code: '',
        discount_type: 'percentage',
        discount_value: 0,
        valid_from: '',
        valid_until: '',
        usage_limit: null
      });
    }
  };

  return (
    <div className="coupon-system">
      <h2>Gerenciamento de Cupons</h2>
      
      <div className="new-coupon">
        <h3>Criar Novo Cupom</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Código:</label>
            <input
              type="text"
              value={newCoupon.code}
              onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Tipo de Desconto:</label>
            <select
              value={newCoupon.discount_type}
              onChange={(e) => setNewCoupon({ ...newCoupon, discount_type: e.target.value })}
            >
              <option value="percentage">Porcentagem