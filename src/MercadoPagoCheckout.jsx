import { useState, useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

initMercadoPago(process.env.MERCADOPAGO_ACCESS_TOKEN);

export default function MercadoPagoCheckout() {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    const createPreference = async () => {
      const response = await fetch('http://localhost:3001/create-pix-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_amount: 100,
          description: 'Pagamento via PIX'
        })
      });
      
      const { id } = await response.json();
      setPreferenceId(id);
    };

    createPreference();
  }, []);

  return (
    <div>
      {preferenceId && <Wallet initialization={{ preferenceId }} />}
    </div>
  );
}
