// useLaunches.ts
import { useEffect, useState } from "react";
import { fetchLaunches } from "../services/launchService";
import type { Launch } from "../types/Launch";

export function useLaunches() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchLaunches();
      setLaunches(data);
    } catch (err) {
      setError("Failed to fetch launches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { launches, loading, error, reload: load };
}