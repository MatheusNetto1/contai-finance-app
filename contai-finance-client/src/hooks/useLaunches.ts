// useLaunches.ts
import { useContext } from "react";
import { LaunchesContext } from "../contexts/LaunchesContext";

export function useLaunches() {
  const context = useContext(LaunchesContext);
  if (!context) {
    throw new Error("useLaunches must be used within a LaunchesProvider");
  }
  return context;
}