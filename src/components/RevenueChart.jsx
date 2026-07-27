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
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 10,
                fontSize: 13,
              }}
            />
            <Bar dataKey="revenue" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
