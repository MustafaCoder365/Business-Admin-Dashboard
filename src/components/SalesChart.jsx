import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { fetchSales } from '../api/mockApi';

export default function SalesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSales().then(setData);
  }, []);

  return (
    <article className="card chart-card">
      <h2 className="card-title">Monthly Sales</h2>
      <p className="card-subtitle">Last 12 months</p>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
