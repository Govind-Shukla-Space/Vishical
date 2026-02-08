import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopsignup } from '../api/auth.api';
import "../css/shopsignup.css";
export const ShopSignUP = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        shopName: "",
        email: "",
        password: "",
        ownerName: "",
        address: "",
        phone: "",
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
            await shopsignup(form);
            navigate("/");
        } catch (err: any) {
            setError(err.message || "Shop signup failed");
        }
        finally {
            setLoading(false);
        }
    };
    return (
        <div className="shop-signup-page">

            <div className="shop-signup-left">
                <div>
                    <h1>Vishical SELLER</h1>
                    <p>Start selling your jewelry to thousands of customers</p>
                </div>
            </div>

            <div className="shop-signup-right">
                <div className="shop-signup-card">
                    <h2>Shop Registration</h2>

                    <form onSubmit={handleSubmit}>
                        <input type="text" name="ownerName" placeholder="Owner Name" value={form.ownerName} onChange={handleChange} required />
                        <input type="text" name="shopName" placeholder="Shop Name" value={form.shopName} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />

                        {error && <p className="shop-error">{error}</p>}

                        <button type="submit" disabled={loading}>
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>
                </div>
            </div>

        </div>

    )
}
