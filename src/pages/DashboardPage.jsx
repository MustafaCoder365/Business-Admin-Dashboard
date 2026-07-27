import OverviewCards from '../components/OverviewCards';
import ChartsRow from '../components/ChartsRow';
import UsersTable from '../components/UsersTable';
import ActivityFeed from '../components/ActivityFeed';
import CategoryBreakdown from '../components/CategoryBreakdown';
import RecentTransactions from '../components/RecentTransactions';
import LowStockWidget from '../components/LowStockWidget';

export default function DashboardPage() {
  return (
    <>
      <OverviewCards />
      <ChartsRow />
      <div className="grid-2">
        <UsersTable />
        <ActivityFeed />
      </div>
      <div className="grid-2">
        <RecentTransactions />
        <CategoryBreakdown />
      </div>
      <LowStockWidget />
    </>
  );
}
