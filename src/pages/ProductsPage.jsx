import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../api/mockApi';
import { statusForStock } from '../data/products';
import { productCategories } from '../data/productCategories';
import { exportToCsv } from '../utils/csv';
import { useSortableData } from '../utils/useSortableData';
import { useCurrency } from '../context/useCurrency';
import { useToast } from '../context/useToast';
import SortableHeader from '../components/SortableHeader';
import Pagination from '../components/Pagination';

const AddProductModal = lazy(() => import('../components/AddProductModal'));

const PAGE_SIZE = 6;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const { format } = useCurrency();
  const { addToast } = useToast();

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  const { sorted, sortKey, sortDir, requestSort } = useSortableData(
    filtered,
    'name'
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageItems = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const summary = useMemo(() => {
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    return {
      total: products.length,
      categories: productCategories.length,
      lowStock,
      outOfStock,
    };
  }, [products]);

  function handleFilterChange(cat) {
    setActiveCategory(cat);
    setPage(1);
  }

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }

  function handleAddProduct(product) {
    setProducts((prev) => [product, ...prev]);
    addToast(`${product.name} added to catalog`, 'success');
  }

  function handleExport() {
    exportToCsv(
      'products.csv',
      sorted.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        sku: p.sku,
        price: p.price,
        stock: p.stock,
        status: statusForStock(p.stock),
      }))
    );
  }

  return (
    <>
      <h2 className="page-title">Products</h2>
      <p className="page-subtitle">
        Manage your product catalog, categories, and stock levels.
      </p>

      <section className="overview-cards">
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Total Products</p>
              <p className="stat-value">{summary.total}</p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-box-seam" aria-hidden="true" />
            </span>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Categories</p>
              <p className="stat-value">{summary.categories}</p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-tags-fill" aria-hidden="true" />
            </span>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Low Stock</p>
              <p className="stat-value">{summary.lowStock}</p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" />
            </span>
          </div>
        </article>
        <article className="stat-card">
          <div className="stat-main">
            <div className="stat-text">
              <p className="stat-label">Out of Stock</p>
              <p className="stat-value">{summary.outOfStock}</p>
            </div>
            <span className="stat-icon">
              <i className="bi bi-x-circle-fill" aria-hidden="true" />
            </span>
          </div>
        </article>
      </section>

      <div className="chip-group">
        {['All', ...productCategories].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleFilterChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <article className="card table-card full-height">
        <div className="card-header-row">
          <div>
            <h2 className="card-title">Catalog</h2>
            <p className="card-subtitle">
              {sorted.length} of {products.length} products
            </p>
          </div>

          <div className="users-filters">
            <input
              type="text"
              placeholder="Search name or SKU..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search products"
            />
            <button
              type="button"
              className="icon-action-btn"
              onClick={handleExport}
              aria-label="Export products to CSV"
              title="Export CSV"
            >
              <i className="bi bi-download" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="topbar-btn"
              onClick={() => setShowAddModal(true)}
            >
              <i className="bi bi-plus-lg" aria-hidden="true" />
              Add Product
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <SortableHeader
                  label="Name"
                  sortKey="name"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={requestSort}
                />
                <SortableHeader
                  label="Category"
                  sortKey="category"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={requestSort}
                />
                <SortableHeader
                  label="Price"
                  sortKey="price"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={requestSort}
                />
                <SortableHeader
                  label="Stock"
                  sortKey="stock"
                  activeKey={sortKey}
                  dir={sortDir}
                  onSort={requestSort}
                />
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5">Loading products...</td>
                </tr>
              )}

              {!loading &&
                pageItems.map((p) => {
                  const status = statusForStock(p.stock);
                  const pillClass =
                    status === 'In Stock'
                      ? 'status-active'
                      : status === 'Low Stock'
                        ? 'status-pending'
                        : 'status-cancelled';
                  return (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{format(p.price)}</td>
                      <td>{p.stock}</td>
                      <td>
                        <span className={`status-pill ${pillClass}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}

              {!loading && pageItems.length === 0 && (
                <tr>
                  <td colSpan="5">No products match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </article>

      {showAddModal && (
        <Suspense fallback={null}>
          <AddProductModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddProduct}
          />
        </Suspense>
      )}
    </>
  );
}
