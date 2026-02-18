// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛒 Pokemon Store
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/products" className="nav-link">Productos</Link>
          
          {user && (
            <Link to="/cart" className="nav-link cart-link">
              🛒 Carrito
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
          )}

          {user ? (
            <div className="user-menu">
              <span className="user-email">{user.email}</span>
              <button onClick={handleLogout} className="btn-logout">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-register">Registro</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;