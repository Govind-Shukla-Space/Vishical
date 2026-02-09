import { Link } from 'react-router-dom';
import "../css/Home.css";
import Footer from './Footer';

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-container">
          <h2 className="logo">Vishical</h2>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/shopsignup">Shop Sign Up</Link></li>
            <li><Link to="/adminsignup">Admin Sign Up</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Platform</h1>
          <p>Connecting shops, users, and admins seamlessly.</p>
          <Link to="/signup"><button>Get Started</button></Link>

        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <div className="feature-card">
          <h3>Shop Management</h3>
          <p>Easily manage your shop inventory, orders, and customers all in one place.</p>
        </div>
        <div className="feature-card">
          <h3>User Friendly</h3>
          <p>Our platform is designed to provide the best experience for users.</p>
        </div>
        <div className="feature-card">
          <h3>Admin Control</h3>
          <p>Admins can oversee everything and ensure smooth operations.</p>
        </div>
      </section>
      <Footer />
    </div>
  );

}