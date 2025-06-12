// LaunchTable.tsx
import { useLaunches } from "../hooks/useLaunches";
import { groupLaunchesByMonth } from "../utils/groupLaunchesByMonth";
import { formatCurrency } from "../utils/formatCurrency";

export default function LaunchTable() {
  const { launches, loading, error } = useLaunches();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const grouped = groupLaunchesByMonth(launches);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Launches</h2>
      {grouped.map((group) => (
        <div key={group.month} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            {group.month}
          </h3>
          <table className="min-w-full table-auto mb-2">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th className="p-2">Date</th>
                <th className="p-2">Description</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {group.launches.map((launch) => (
                <tr key={launch.id} className="border-t text-sm text-gray-800">
                  <td className="p-2">
                    {new Date(launch.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-2">{launch.description}</td>
                  <td className="p-2">{formatCurrency(launch.value)}</td>
                  <td className="p-2">{launch.type}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium text-sm text-gray-700 border-t">
                <td className="p-2" colSpan={2}>
                  Monthly Total
                </td>
                <td className="p-2 text-green-600">
                  +{formatCurrency(group.totalCredit)}
                </td>
                <td className="p-2 text-red-600">
                  -{formatCurrency(group.totalDebit)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}