import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword })
    });

    if (response.ok) {
      setMessage('Senha redefinida com sucesso.');
    } else {
      setMessage('Erro ao redefinir senha.');
    }
  };

  return (
    <div className="reset-password">
      <h2>Redefinir Senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Redefinir</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
