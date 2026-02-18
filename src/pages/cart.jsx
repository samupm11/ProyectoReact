// src/pages/Cart.jsx
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';
import './Cart.css';

function Cart() {
  const { user } = useAuth();
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Tu carrito está vacío 🛒</h2>
          <p>¡Añade algunos productos para empezar!</p>
          <Link to="/products" className="btn-browse-products">
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Tu Carrito de Compra 🛍️</h1>

        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">
                    {Number(item.price).toFixed(2)}€
                  </p>
                </div>

                <div className="cart-item-quantity">
                  <label htmlFor={`qty-${item.id}`}>Cantidad:</label>
                  <input
                    type="number"
                    id={`qty-${item.id}`}
                    min="1"
                    max={item.stock || 99}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="quantity-input"
                  />
                </div>

                <div className="cart-item-subtotal">
                  <strong>
                    {(Number(item.price) * item.quantity).toFixed(2)}€
                  </strong>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-remove"
                >
                  🗑️ Eliminar
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Resumen del Pedido</h2>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{total.toFixed(2)}€</span>
            </div>

            <div className="summary-row">
              <span>Envío:</span>
              <span className="free-shipping">GRATIS</span>
            </div>

            <div className="summary-total">
              <span>Total:</span>
              <span className="total-price">{total.toFixed(2)}€</span>
            </div>

            <button className="btn-checkout" disabled={cart.length === 0}>
              Proceder al Pago
            </button>

            <button onClick={clearCart} className="btn-clear-cart">
              Vaciar Carrito
            </button>

            <Link to="/products" className="btn-continue-shopping">
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;