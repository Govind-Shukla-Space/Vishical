import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { logout } from "../api/auth.api";
import ProductCard from "../components/ProductCard";
import "../css/shopsdashboard.css";
import type { Product } from "../model/product";
import { useShop } from "../service/useshop";
import type { ProductRequest } from "../type/model";
import { AddProductForm } from "./AddProductForm";
import { UpdatePassword } from "./UpdatePassword";

export const ShopDashboard = () => {
  const { loading, changePassword, products, fetchProducts,
    uploadProduct, deleteProductById } = useShop();

  const [section, setSection] = useState("dashboard");
  const shopId = Number(localStorage.getItem("shopId")); // replace with actual logged-in shopId
  const navigate = useNavigate();
  useEffect(() => {
    if (!shopId) return;
    if (section !== "products" && section !== "dashboard") return;
    const load = () => fetchProducts(shopId);
    load();
    const interval = setInterval(load, 300000);
    return () => clearInterval(interval);

  }, [section, shopId]);

  console.log("Shop ID from localStorage:", shopId); // Debugging line
  // Fetch products when entering the "products" section
  const handleLogout = async () => {
    try {
      await logout(); // ✅ Call backend to clear cookies
      localStorage.removeItem('shopId');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('shopId');
      navigate('/login');
    }
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className="shop-layout">
      {/* SIDEBAR */}
      <aside className="shop-sidebar">
        <div className="shop-logo-section">
          <h2 className="logo">LOREX</h2>
        </div>
        <nav className="shop-nav">
          <button onClick={() => setSection("dashboard")}>Dashboard</button>
          {/* <button onClick={() => setSection("shops")}>Approved Shops</button> */}
          <button onClick={() => setSection("products")}>Products</button>
          <button onClick={() => setSection("updatepassword")}>Update Password</button>
        </nav>
        <div className="shop-sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="shop-content">
        {/* DASHBOARD SECTION */}
        {section === "dashboard" && (
          <>
            <h2 className="dashboard-title">Shop Dashboard</h2>
            <div className="product-list">
              {products?.length > 0 ? (
                products.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={deleteProductById}
                    showDelete={true} />
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📦</div>
                  <p>No products available</p>
                </div>
              )}
            </div>
          </>
        )}
        {/* PRODUCTS SECTION */}
        {section === "products" && (
          <>
            <h3 className="section-title">Your Products</h3>
            {/* ADD PRODUCT FORM */}
            <AddProductForm
              onAddProduct={async (product: ProductRequest, file: File) => {
                await uploadProduct(shopId, product, file);
              }}
            />
          </>
        )}

        {/* UPDATE PASSWORD SECTION */}
        {section === "updatepassword" && (
          <div className="updatepassword-panel">
            <UpdatePassword onUpdatePassword={changePassword} />
          </div>
        )}
      </main>
    </div>
  );
};