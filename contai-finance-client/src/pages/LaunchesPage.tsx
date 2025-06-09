import LaunchForm from '../components/LaunchForm';
import LaunchTable from '../components/LaunchTable';

export default function LaunchesPage() {
  return (
    <div className="container">
      <h1>Lançamentos</h1>
      <LaunchForm />
      <LaunchTable />
    </div>
  );
}
