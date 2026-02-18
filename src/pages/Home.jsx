// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('featured', '==', true));
        const querySnapshot = await getDocs(q);
        
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        
        setFeaturedProducts(products);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="home">
      {/* Sección de bienvenida */}
      <section className="hero">
        <div className="hero-container">
          <h1>¡Bienvenido a Pokemon Store! 🛒</h1>
          <p>
            Tu tienda online de productos Pokémon. Encuentra cartas, peluches, 
            juegos, libros y mucho más merchandising oficial.
          </p>
          <Link to="/products" className="btn-primary">
            Ver todos los productos
          </Link>
        </div>
      </section>

      {/* Sección de productos destacados */}
      <section className="featured-section">
        <div className="container">
          <h2>Productos Destacados ⭐</h2>
          <p className="section-description">
            Estos son algunos de nuestros productos más populares
          </p>

          {loading ? (
            <div className="loading">Cargando productos...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <Link 
                    to={`/product/${product.id}`} 
                    key={product.id} 
                    className="product-card"
                  >
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-price">{product.price.toFixed(2)}€</p>
                      <p className="product-category">{product.category}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="no-products">
                  No hay productos destacados disponibles.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Sección de información de la tienda */}
      <section className="info-section">
        <div className="container">
          <h2>Sobre Nosotros</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>📍 Ubicación</h3>
              <p>Calle Pokémon 123</p>
              <p>15142 Arteixo, España</p>
            </div>
            <div className="info-card">
              <h3>📞 Contacto</h3>
              <p>Tel: +34 671 39 62 02</p>
              <p>Email: samuelpereiramarante05@liceolapaz.net</p>
            </div>
            <div className="info-card">
              <h3>🕐 Horario</h3>
              <p>Lunes - Viernes: 9:00 - 20:00</p>
              <p>Sábados: 10:00 - 14:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;