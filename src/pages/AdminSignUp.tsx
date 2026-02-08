import React, { useState } from 'react';
import { adminsignup} from '../api/auth.api';
import { useNavigate } from 'react-router-dom';
import "../css/adminsignup.css";
export const AdminSignUp = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            console.log(form);
            const res = await adminsignup(form);
            console.log(res.data);
            console.log(res.data); // success if no error thrown
            navigate("/");
        } catch (err: any) {
            console.log(err.message);
            setError(err.message || "Admin signup failed");
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div className="admin-page">
            <div className="admin-card">
                <h2>Admin Sign Page</h2>
                <form onSubmit={handleSubmit}>

                    <input type="email" name='email'
                        placeholder='Email'
                        value={form.email}
                        onChange={handleChange}
                        required />

                    <input type="password" name='password'
                        placeholder='Password'
                        value={form.password}
                        onChange={handleChange}
                        required />
                    
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type='submit' disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}</button>
                </form>
            </div>
        </div>
    )
}
