import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RequestTwoFactor() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/request-2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      setMessage('Código enviado para o seu e-mail.');
    } else {
      setMessage('Erro ao enviar código.');
    }
  };

  return (
    <div className="request-2fa">
      <h2>Solicitar Código 2FA</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar Código</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
