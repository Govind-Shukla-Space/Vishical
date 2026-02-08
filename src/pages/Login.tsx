import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.api";
import "../css/login.css";

export default function Login() {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      console.log(form);
      const res = await login(form);
      if (res.data.role === "ADMIN") {
        navigate("/admin");     // or dashboard
      }
      else if (res.data.role === "SHOP") {
        localStorage.setItem("shopId", res.data.id.toString());
        navigate("/shopdashboard");
      } else if (res.data.role === "USER") {
        navigate("/userdashboard");
      }
      else{
        alert("Unknown !!! Please contact support.");
        setForm({ email: "", password: "" });
        navigate("/login");
      }
    } catch (err: any) {
      setError(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="login-page">
      <div className="login-brand">
        <div className="brand-text">Vishical</div>
      </div>

      <div className="login-box">
        <div className="login-card">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <input type="text" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            {error && <p className="error-text">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="signup-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>

  );
}
