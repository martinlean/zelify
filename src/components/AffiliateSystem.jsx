import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AffiliateSystem() {
  const { user } = useAuth();
  const [affiliate, setAffiliate] = useState(null);
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [affiliateRes, referralsRes] = await Promise.all([
        fetch(`/affiliates?user_id=${user.id}`),
        fetch(`/affiliates/referrals?user_id=${user.id}`)
      ]);
      
      const affiliateData = await affiliateRes.json();
      const referralsData = await referralsRes.json();
      
      setAffiliate(affiliateData);
      setReferrals(referralsData);
    };

    fetchData();
  }, [user.id]);

  const handleSignup = async () => {
    const response = await fetch('/affiliates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id })
    });

    if (response.ok) {
      const data = await response.json();
      setAffiliate(data);
    }
  };

  return (
    <div className="affiliate-system">
      <h2>Programa de Afiliados</h2>
      
      {affiliate ? (
        <div className="affiliate-dashboard">
          <div className="stats">
            <div>
              <h3>Seu Código</h3>
              <p>{affiliate.code}</p>
            </div>
            <div>
              <h3>Saldo</h3>
              <p>R$ {(affiliate.balance / 100).toFixed(2)}</p>
            </div>
          </div>

          <div className="referrals">
            <h3>Indicações</h3>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td>{referral.email}</td>
                    <td>{new Date(referral.created_at).toLocaleDateString()}</td>
                    <td>{referral.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="signup">
          <h3>Junte-se ao Programa de Afiliados</h3>
          <button onClick={handleSignup}>Cadastrar</button>
        </div>
      )}
    </div>
  );
}
