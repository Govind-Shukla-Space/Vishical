import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import "../css/userdashboard.css";
import type { Product } from '../model/product';
import { useuser } from '../service/useuser';
import { UpdatePassword } from './UpdatePassword';
import { logout } from '../api/auth.api';

export const UserDashboard = () => {
  const [section, setSection] = useState("products");
  const { updatePassword, products, error } = useuser();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout(); // ✅ Call backend to clear cookies
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/login');
    }
  };

  return (
    <div className="user-dashboard">
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <h2 className="nav-logo">User Panel</h2>
        <div className="nav-buttons">
          <button className={section === "products" ? "active" : ""}
            onClick={() => setSection("products")}>
            Products
          </button>
          <button
            className={section === "password" ? "active" : ""}
            onClick={() => setSection("password")}>
            Change Password
          </button>
          <button onClick={handleLogout}>
            <span className="side-icon">🚪</span>
            Logout
          </button>
        </div>
      </nav>

      {/*CONTENT */}
      <div className="dashboard-content">
        <p className="dashboard-title">User Dashboard</p>
        {error && <p className="dashboard-error">{error}</p>}
        {
          section === "products" && (
            <div className="products-panel">
              <div className="product-list">
                {products?.length > 0 ? (
                  products.map((product: Product) => (
                    <ProductCard
                      key={product.id}
                      product={product} />
                  ))
                ) : (
                  <p>No products available.</p>
                )}
              </div>
            </div>
          )
        }

        {/* PASSWORD SECTION */}
        {section === "password" && (
          <div className="password-section">
            <UpdatePassword onUpdatePassword={updatePassword} />
          </div>
        )}
      </div>
    </div>
  );
}
