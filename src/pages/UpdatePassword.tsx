import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/updatepassword.css";
import { logout } from '../api/auth.api';

type Props = {
  onUpdatePassword: (data: {
    email: string;
    oldPassword: string;
    newPassword: string;
  }) => Promise<any>;
};

export const UpdatePassword = ({ onUpdatePassword }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    email: "",
    oldPassword: "",
    newPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await onUpdatePassword(form);
      if (res?.data.message === "PASSWORD_UPDATED_SUCCESSFULLY") {
        alert("Password updated successfully. Please log in again.");
        setSuccess("Password updated successfully. Please log in again.");
        await logout(); // Call backend to clear cookies
      }
      // setError( "Password update failed");
    } catch (err: any) {
      setError(err.message || "Password update failed");
      console.log(err.message || "Password update failed");
    } finally {
      navigate('/login');
      setLoading(false);
    }
  }
  return (
    <div className="password-wrapper">
      <div className="password-card">
        <h2 className="password-title">Update Password</h2>

        <form onSubmit={handleSubmit} className="password-form">
          <div className="input-group">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <span>Email Address</span>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={form.oldPassword}
              onChange={handleChange}
              required
            />
            <span>Old Password</span>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
            <span>New Password</span>
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
          <button type="submit" disabled={loading} className="password-btn">
            {loading ? "Changing..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>

  );
}
