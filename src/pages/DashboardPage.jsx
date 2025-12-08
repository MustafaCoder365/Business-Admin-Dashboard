import OverviewCards from '../components/OverviewCards';
import ChartsRow from '../components/ChartsRow';
import UsersTable from '../components/UsersTable';
import ActivityFeed from '../components/ActivityFeed';

export default function DashboardPage() {
  return (
    <>
      <OverviewCards />
      <ChartsRow />
      <div className="grid-2">
        <UsersTable />
        <ActivityFeed />
      </div>
    </>
  );
}
