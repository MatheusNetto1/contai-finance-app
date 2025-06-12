// LaunchesContext.tsx
import { createContext, useEffect, useState } from "react";
import { fetchLaunches } from "../services/launchService";
import type { Launch } from "../types/Launch";

interface LaunchesContextValue {
  launches: Launch[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export const LaunchesContext = createContext<LaunchesContextValue | undefined>(undefined);

export function LaunchesProvider({ children }: { children: React.ReactNode }) {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchLaunches();
      setLaunches(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch launches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <LaunchesContext.Provider value={{ launches, loading, error, reload: load }}>
      {children}
    </LaunchesContext.Provider>
  );
}