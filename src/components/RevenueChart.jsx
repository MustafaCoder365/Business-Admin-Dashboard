import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { fetchRevenue } from '../api/mockApi';

export default function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRevenue().then(setData);
  }, []);

  return (
    <article className="card chart-card">
      <h2 className="card-title">Quarterly Revenue</h2>
      <p className="card-subtitle">Current year</p>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
