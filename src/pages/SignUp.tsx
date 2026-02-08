import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authsign } from "../api/auth.api";
import "../css/signup.css";
export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
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
    try{
      const res=await authsign(form);
      console.log(res.data); // success if no error thrown
      navigate("/");
    }catch(err:any){
      setError(err.message || "Signup failed");
    }finally{
      setLoading(false);
    }
    
  };

  return (
    <div className="signup-page">

  <div className="signup-bg-text">LOREX • LOREX • LOREX</div>

  <div className="signup-card">
    <h2>Create Account</h2>

    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />

      {error && <p className="signup-error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>

    <div className="signup-login">
      Already have an account? <Link to="/login">Login</Link>
    </div>
  </div>

</div>

  );
}
