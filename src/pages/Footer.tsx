import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import "../css/Footer.css";

const Footer = () => {  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="brand">
              <div className="brand-logo">L</div>
              <span className="brand-name">Luxora</span>
            </div>
            <p className="brand-text">
              Timeless Jewelry, Crafted with Elegance
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Collections</a></li>
              <li><a href="#">Become a Seller</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-title">Contact</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={16} />
                <span>info@luxora.com</span>
              </li>
              <li>
                <Phone size={16} />
                <span>+91 12345-67890</span>
              </li>
              <li>
                <MapPin size={16} />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="footer-title">Follow Us</h4>
            <div className="footer-social">
              <a href="#"><Facebook size={18} /></a>
              <a href="#"><Instagram size={18} /></a>
              <a href="#"><Twitter size={18} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Luxora. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
export default Footer;