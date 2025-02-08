import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SupportSystem() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '' });

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch(`/support/tickets?user_id=${user.id}`);
      const data = await response.json();
      setTickets(data);
    };
    fetchTickets();
  }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/support/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        ...newTicket
      })
    });

    if (response.ok) {
      const ticket = await response.json();
      setTickets([...tickets, ticket]);
      setNewTicket({ subject: '', message: '' });
    }
  };

  return (
    <div className="support-system">
      <h2>Suporte ao Cliente</h2>
      
      <div className="new-ticket">
        <h3>Novo Ticket</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Assunto"
            value={newTicket.subject}
            onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
            required
          />
          <textarea
            placeholder="Descreva seu problema"
            value={newTicket.message}
            onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </div>

      <div className="tickets-list">
        <h3>Meus Tickets</h3>
        {tickets.map((ticket) => (
          <div key={ticket.id} className="ticket">
            <div className="ticket-header">
              <h4>{ticket.subject}</h4>
              <span className={`status ${ticket.status}`}>{ticket.status}</span>
            </div>
            <p>{ticket.message}</p>
            <small>
              Criado em: {new Date(ticket.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
