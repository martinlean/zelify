import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'seller' // Padrão para seller, pode ser alterado
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', formData.email)
      .single();

    if (error || !data || data.password !== formData.password) {
      alert('Login failed');
      return;
    }

    localStorage.setItem('token', data.token);
    switch (formData.role) {
      case 'admin':
        window.location.href = 'https://admin.zellify.online';
        break;
      case 'seller':
        window.location.href = 'https://app.zellify.online';
        break;
      case 'member':
        window.location.href = 'https://areamembers.zellify.online';
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="seller">Seller</option>
          <option value="member">Member</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
