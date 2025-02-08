import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';
import './ModernMemberArea.css';

export default function ModernMemberArea() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/member/products`);
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="modern-member-area">
      <div className="sidebar">
        <div className="user-info">
          <h2>{user?.email}</h2>
          <p>Membro desde: {new Date(user?.created_at).toLocaleDateString()}</p>
        </div>
        <nav>
          <button
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Meus Produtos
          </button>
          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Configurações
          </button>
        </nav>
      </div>

      <div className="content">
        {activeTab === 'products' && (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings">
            <h2>Configurações da Conta</h2>
            {/* Formulário de configurações */}
          </div>
        )}
      </div>
    </div>
  );
}
