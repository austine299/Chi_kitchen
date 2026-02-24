import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  addProduct,
  deleteProduct,
} from "../../data/productStorage";
import { CATEGORIES } from "../../data/categories";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const emptyForm = {
    id: null,
    name: "",
    category: "",
    image: "",
    description: "",
    rating: "",
    reviews: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // New state for submit status

  /* Load Products */
  useEffect(() => {
    const load = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    load();
  }, []);

  const refresh = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  /* Inputs */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* Image upload */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () =>
      setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  /* Add or update */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.description) {
      return alert("Fill all fields");
    }
    if (!form.image) return alert("Upload an image");

    try {
      setSubmitting(true); // disable button and show loading

      // Call the right API
      let result;
      result = await addProduct(form);

      setProducts((prev) => [...prev, { ...form, id: result.id }]);

      // Check backend response
      if (!result.success) {
        alert(result.error || "Failed to save Product");
        return;
      }

      alert("Product added!");
      console.log("Updating with form:", form);

      setForm(emptyForm);
    } catch (err) {
      console.error("Submit error:", err);
      alert(err.message || "Something went wrong!");
    } finally {
      setSubmitting(false); // re-enable button
    }
  };

  /* Delete product */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      setSubmitting(true);
      await deleteProduct(id);
      await refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 fixed top-0 left-0 w-full p-12 h-20 bg-white/80 backdrop-blur z-50 shadow-md">
        <h2 className="text-2xl font-bold">Welcome, CHI_KITCHEN</h2>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow space-y-4">
        <h2 className="text-2xl font-bold">Add New product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="product name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Select category</option>

            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {form.image && (
            <img
              src={form.image}
              alt=""
              className="h-32 rounded-lg object-cover"
            />
          )}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="rating"
            placeholder="Rate"
            value={form.rating}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="reviews"
            placeholder="product review"
            value={form.reviews}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            disabled={submitting} // Disable button while submitting
            className={`w-full py-2 rounded ${
              submitting ? "bg-gray-400" : "bg-green-600"
            } text-white`}
          >
            {submitting ? "Adding..." : "Add Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Back
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">Posted products</h3>

        {loading ? (
          <p className="text-center text-gray-500 text-xl py-16">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 text-xl py-16">
            No products added yet
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-xl shadow space-y-3"
              >
                <img
                  src={product.image}
                  className="h-40 w-full object-cover rounded"
                  alt=""
                />
                <h4 className="font-bold">{product.name}</h4>
                <p className="text-sm">{product.category}</p>
                <p className="text-sm">{product.rating}</p>
                <p className="text-sm">{product.reviews}</p>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={submitting} // Disable while deleting
                    className={`flex-1 py-1 rounded text-white ${submitting ? "bg-gray-400" : "bg-red-600"}`}
                  >
                    {submitting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
