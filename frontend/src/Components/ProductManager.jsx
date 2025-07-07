import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductManager = ({ wishlistId, userEmail }) => {
  const [products, setProducts] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({ name: '', imageUrl: '', price: '' });
  const [editingProductId, setEditingProductId] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/wishlists/${wishlistId}`);
      setProducts(res.data.wishlist.products);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [wishlistId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        await axios.put(`${backendUrl}/api/wishlists/${wishlistId}/products/${editingProductId}`, form);
        toast.success("Product updated");
      } else {
        await axios.post(`${backendUrl}/api/wishlists/${wishlistId}/products`, form);
        toast.success("Product added");
      }

      setForm({ name: '', imageUrl: '', price: '' });
      setEditingProductId(null);
      setFormVisible(false); // hide form after submit
      fetchProducts();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
    });
    setEditingProductId(product._id);
    setFormVisible(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${backendUrl}/api/wishlists/${wishlistId}/products/${productId}`);
      toast.success("Deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Products</h2>

      {/* Show Add Button if no products or editing */}
      {!formVisible && (
        <button
          className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          onClick={() => setFormVisible(true)}
        >
          {products.length === 0 ? 'Add Your First Product' : 'Add More Products'}
        </button>
      )}

      {formVisible && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="url"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <div className="col-span-1 md:col-span-3 flex gap-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              {editingProductId ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() => {
                setFormVisible(false);
                setEditingProductId(null);
                setForm({ name: '', imageUrl: '', price: '' });
              }}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {products.length === 0 && !formVisible && (
        <p className="text-gray-500 dark:text-gray-300">No products yet. Start by adding one!</p>
      )}

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="flex items-center justify-between border-b pb-2">
            <div>
              <p className="font-semibold">{product.name}</p>
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} className="h-16 mt-2 rounded" />
              )}
              <p className="text-sm text-gray-500">Price: ₹{product.price}</p>
              <p className="text-xs text-gray-400">Added by: {product.addedBy}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(product)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;
