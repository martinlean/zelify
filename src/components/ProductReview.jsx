import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ProductReview({ productId }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch('/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: productId,
        user_id: user.id,
        rating,
        comment
      })
    });

    if (response.ok) {
      // Atualizar lista de avaliações
    }
  };

  return (
    <div className="product-review">
      <h3>Deixe sua avaliação</h3>
      <form onSubmit={handleSubmit}>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? 'active' : ''}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Deixe seu comentário..."
        />
        <button type="submit">Enviar Avaliação</button>
      </form>
    </div>
  );
}
