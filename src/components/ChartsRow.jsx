import SalesChart from './SalesChart';
import RevenueChart from './RevenueChart';

export default function ChartsRow() {
  return (
    <section className="charts-row">
      <SalesChart />
      <RevenueChart />
    </section>
  );
}
