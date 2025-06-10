// LaunchTable.tsx
import { useEffect, useState } from "react";
import { fetchLaunches } from "../services/launchService";
import type { Launch } from "../types/Launch";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate";

export default function LaunchTable() {
  const [launches, setLaunches] = useState<Launch[]>([]);

  useEffect(() => {
    async function loadLaunches() {
      try {
        const data = await fetchLaunches();
        setLaunches(data);
      } catch (error) {
        console.error("Failed to fetch launches", error);
      }
    }

    loadLaunches();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Launches</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
            <th className="p-2">Date</th>
            <th className="p-2">Description</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {launches.map((launch) => (
            <tr key={launch.id} className="border-t text-sm text-gray-800">
              <td className="p-2">{formatDate(launch.date)}</td>
              <td className="p-2">{launch.description}</td>
              <td className="p-2">{formatCurrency(launch.value)}</td>
              <td className="p-2">{launch.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}