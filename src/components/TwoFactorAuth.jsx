import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function TwoFactorAuth() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error: authError } = await supabase
      .from('users')
      .update({ two_factor_code: code })
      .eq('id', localStorage.getItem('userId'))
      .select()
      .single();

    if (authError) {
      setError('Invalid code');
      return;
    }

    localStorage.setItem('twoFactorVerified', 'true');
    window.location.reload();
  };

  return (
    <div className="two-factor-auth">
      <h2>Two-Factor Authentication</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
