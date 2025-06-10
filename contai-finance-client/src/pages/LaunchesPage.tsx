// LaunchesPage.tsx
import LaunchForm from "../components/LaunchForm";
import LaunchTable from "../components/LaunchTable";

export default function LaunchesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Financial Dashboard</h1>
        <LaunchForm />
        <LaunchTable />
      </div>
    </div>
  );
}