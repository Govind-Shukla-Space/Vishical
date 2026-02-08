// AddProductForm.tsx
import { useState } from "react";
import "../css/addproduct.css"; // optional CSS for styling
import type { ProductRequest } from "../type/model";
type Props = {
  onAddProduct: (product: ProductRequest, file: File) => Promise<any>;
};

export const AddProductForm = ({ onAddProduct }: Props) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handles input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await onAddProduct(form, file); // Call the prop function
      setSuccess("Product added successfully!");
      // Reset form
      setForm({ name: "", description: "", price: 0 });
      setFile(null);
      console.log(res);
    } catch (err: any) {
      setError(err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-wrapper">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          required
        />
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};
