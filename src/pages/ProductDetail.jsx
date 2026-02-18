// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', id);
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          console.error('Producto no encontrado');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener producto:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= (product?.stock || 99)) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    alert(`✅ ${quantity} x ${product.name} añadido(s) al carrito`);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading">Cargando producto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="not-found">
          <h2>Producto no encontrado 😕</h2>
          <Link to="/products" className="btn-back">
            ← Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to="/products" className="btn-back-link">
          ← Volver a productos
        </Link>

        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            
            <p className="product-detail-price">
              {Number(product.price).toFixed(2)}€
            </p>

            <div className="product-detail-meta">
              <div className="meta-item">
                <span className="meta-label">Categoría:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Stock:</span>
                <span className={`meta-value ${product.stock < 10 ? 'low-stock' : ''}`}>
                  {product.stock} unidades disponibles
                </span>
              </div>

              {product.featured && (
                <div className="meta-item">
                  <span className="meta-value featured-badge">⭐ Producto destacado</span>
                </div>
              )}
            </div>

            <p className="product-detail-description">{product.description}</p>

            <div className="quantity-selector">
              <label htmlFor="quantity">Cantidad:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock || 99}
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
              />
            </div>

            {user ? (
              <button 
                onClick={handleAddToCart} 
                className="btn-add-to-cart"
                disabled={product.stock === 0}
              >
                🛒 Añadir al carrito
              </button>
            ) : (
              <div className="login-prompt">
                <p>🔐 Inicia sesión para añadir productos al carrito</p>
                <Link to="/login" className="btn-login-prompt">
                  Iniciar Sesión
                </Link>
              </div>
            )}

            {product.stock > 0 && product.stock < 10 && (
              <p className="low-stock-warning">
                ⚠️ ¡Quedan pocas unidades!
              </p>
            )}

            {product.stock === 0 && (
              <p className="out-of-stock">
                ❌ Producto agotado
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;