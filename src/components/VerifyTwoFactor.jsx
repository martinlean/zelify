import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function VerifyTwoFactor() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/verify-2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      window.location.href = '/dashboard';
    } else {
      setError('Código inválido.');
    }
  };

  return (
    <div className="verify-2fa">
      <h2>Verificar Código 2FA</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Código de verificação"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verificar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
