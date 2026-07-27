export const products = [
  { id: 'PRD-001', name: 'Wireless Mouse', category: 'Electronics', price: 24.99, stock: 6, sku: 'ELE-1001' },
  { id: 'PRD-002', name: 'Mechanical Keyboard', category: 'Electronics', price: 89.0, stock: 34, sku: 'ELE-1002' },
  { id: 'PRD-003', name: 'Noise Cancelling Headphones', category: 'Electronics', price: 149.5, stock: 12, sku: 'ELE-1003' },
  { id: 'PRD-004', name: '4K Monitor 27"', category: 'Electronics', price: 329.0, stock: 0, sku: 'ELE-1004' },
  { id: 'PRD-005', name: 'Men\'s Denim Jacket', category: 'Fashion', price: 59.99, stock: 41, sku: 'FAS-2001' },
  { id: 'PRD-006', name: 'Running Shoes', category: 'Sports & Outdoors', price: 74.0, stock: 8, sku: 'SPO-3001' },
  { id: 'PRD-007', name: 'Yoga Mat', category: 'Sports & Outdoors', price: 19.99, stock: 55, sku: 'SPO-3002' },
  { id: 'PRD-008', name: 'Camping Tent 4-Person', category: 'Sports & Outdoors', price: 129.0, stock: 5, sku: 'SPO-3003' },
  { id: 'PRD-009', name: 'Ceramic Plant Pot Set', category: 'Home & Garden', price: 34.5, stock: 28, sku: 'HOM-4001' },
  { id: 'PRD-010', name: 'LED Desk Lamp', category: 'Home & Garden', price: 27.0, stock: 3, sku: 'HOM-4002' },
  { id: 'PRD-011', name: 'The Business Mindset', category: 'Books', price: 15.99, stock: 63, sku: 'BOK-5001' },
  { id: 'PRD-012', name: 'Modern JavaScript Handbook', category: 'Books', price: 22.0, stock: 17, sku: 'BOK-5002' },
  { id: 'PRD-013', name: 'Hydrating Face Serum', category: 'Beauty', price: 18.75, stock: 9, sku: 'BEA-6001' },
  { id: 'PRD-014', name: 'Matte Lipstick Set', category: 'Beauty', price: 26.5, stock: 0, sku: 'BEA-6002' },
];

export function statusForStock(stock) {
  if (stock === 0) return 'Out of Stock';
  if (stock <= 10) return 'Low Stock';
  return 'In Stock';
}
