import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setContent(data.content);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Carregando...</div>;

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <div className="product-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
