// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🛒 Pokemon Store</h3>
          <p>Tu tienda online de productos Pokémon.</p>
          <p>Cartas, peluches, juegos, libros y mucho más.</p>
        </div>

        <div className="footer-section">
          <h4>Enlaces rápidos</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/products">Productos</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registro</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📧 samuelpereiramarante05@liceolapaz.net</p>
          <p>📞 +34 671396202</p>
          <p>📍 Calle Pokémon 123, Arteixo</p>
        </div>

        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Pokemon Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;