import UsersTable from '../components/UsersTable';

export default function UsersPage() {
  return (
    <>
      <h2 className="page-title">Users</h2>
      <p className="page-subtitle">Manage and review all platform users.</p>
      <UsersTable fullHeight />
    </>
  );
}
