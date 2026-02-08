import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import "../css/admin.css";
import { useadmin } from '../service/useadmin';
import type { Product } from '../model/product';
import PendingShopsPage from './PendingShopsPage';
import ShopPage from './ShopPage';
import { UpdatePassword } from './UpdatePassword';
import UserPage from './UserPage';
import { logout } from '../api/auth.api';

export const Admin = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const adminData = useadmin();
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     navigate('/login');
    // };
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
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo-section">
                    <div className="admin-logo-icon">L</div>
                    <h2 className="admin-logo-text">LOREX</h2>
                    <p className="admin-subtitle">Admin Panel</p>
                </div>

                <nav className="admin-nav">
                    <button
                        className={activeSection === "dashboard" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setActiveSection("dashboard")}
                    >
                        <span className="nav-icon">📊</span>
                        Dashboard
                    </button>
                    <button
                        className={activeSection === "shops" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setActiveSection("shops")}
                    >
                        <span className="nav-icon">🏪</span>
                        Shops
                    </button>
                    <button
                        className={activeSection === "pendingShops" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setActiveSection("pendingShops")}
                    >
                        <span className="nav-icon">⏳</span>
                        Pending Shops
                        {adminData.pendingShops?.length > 0 && (
                            <span className="badge">{adminData.pendingShops.length}</span>
                        )}
                    </button>
                    <button
                        className={activeSection === "users" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setActiveSection("users")}
                    >
                        <span className="nav-icon">👥</span>
                        Users
                    </button>
                    <button
                        className={activeSection === "products" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setActiveSection("products")}
                    >
                        <span className="nav-icon">💎</span>
                        Products
                    </button>
                    <button
                        className={activeSection === "updatepassword" ? "nav-btn active" : "nav-btn"}
                        onClick={() => setActiveSection("updatepassword")}
                    >
                        <span className="nav-icon">🔐</span>
                        Update Password
                    </button>
                </nav>

                <div className="admin-sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        <span className="nav-icon">🚪</span>
                        Logout
                    </button>
                </div>
            </aside>

            <main className="admin-content">
                <div className="admin-header">
                    <h1 className="section-title">
                        {activeSection === 'dashboard' && 'Dashboard Overview'}
                        {activeSection === 'shops' && 'All Shops'}
                        {activeSection === 'pendingShops' && 'Pending Approval'}
                        {activeSection === 'users' && 'User Management'}
                        {activeSection === 'products' && 'Product Catalog'}
                        {activeSection === 'updatepassword' && 'Security Settings'}
                    </h1>
                </div>

                <div className="content-card">
                    {activeSection === "dashboard" && (
                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <div className="stat-icon">🏪</div>
                                <div className="stat-content">
                                    <h3>{adminData.shops?.length || 0}</h3>
                                    <p>Total Shops</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">⏳</div>
                                <div className="stat-content">
                                    <h3>{adminData.pendingShops?.length || 0}</h3>
                                    <p>Pending Approval</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">👥</div>
                                <div className="stat-content">
                                    <h3>{adminData.users?.length || 0}</h3>
                                    <p>Total Users</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">💎</div>
                                <div className="stat-content">
                                    <h3>{adminData.products?.length || 0}</h3>
                                    <p>Total Products</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === "shops" && <ShopPage Data={adminData} />}
                    {activeSection === "pendingShops" && <PendingShopsPage Data={adminData} />}
                    {activeSection === "users" && <UserPage />}

                    {activeSection === "products" && (
                        <div className="products-panel">
                            {adminData.products?.length > 0 ? (
                                <div className="product-grid">
                                    {adminData.products.map((product: Product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onDelete={adminData.deleteProductById}
                                            showDelete={true}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">📦</div>
                                    <p>No products available</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeSection === "updatepassword" && (
                        <div className="password-panel">
                            <UpdatePassword onUpdatePassword={adminData.updatepassword} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
