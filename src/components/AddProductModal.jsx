import { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { productCategories } from '../data/productCategories';

export default function AddProductModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(productCategories[0]);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !price || !stock) return;

    onAdd({
      id: `PRD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      category,
      price: Number(price),
      stock: Number(stock),
      sku: `${category.slice(0, 3).toUpperCase()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
    });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <AnimatePresence>
        <Motion.div
          className="modal-box"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>

          <h2 className="card-title">Add Product</h2>
          <p className="card-subtitle">Add a new product to your catalog.</p>

          <form onSubmit={handleSubmit}>
            <div className="settings-field">
              <label htmlFor="product-name">Product name</label>
              <input
                id="product-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="settings-field">
              <label htmlFor="product-category">Category</label>
              <select
                id="product-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {productCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="settings-field">
              <label htmlFor="product-price">Price ($)</label>
              <input
                id="product-price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="settings-field">
              <label htmlFor="product-stock">Stock quantity</label>
              <input
                id="product-stock"
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="topbar-btn">
              <i className="bi bi-plus-lg" aria-hidden="true" />
              Add product
            </button>
          </form>
        </Motion.div>
      </AnimatePresence>
    </div>
  );
}
