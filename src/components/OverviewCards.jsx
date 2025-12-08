import { useEffect, useState } from 'react';
import StatCard from './StatCard';
import { fetchStats } from '../api/mockApi';

export default function OverviewCards() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <section className="overview-cards">Loading stats...</section>;
  }

  return (
    <section className="overview-cards">
      {data.map((item) => (
        <StatCard key={item.id} stat={item} />
      ))}
    </section>
  );
}
