import { useState } from 'react';

export default function RequestPasswordRecovery() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/request-password-recovery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      setMessage('E-mail de recuperação enviado.');
    } else {
      setMessage('Erro ao enviar e-mail.');
    }
  };

  return (
    <div className="request-password-recovery">
      <h2>Recuperar Senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
