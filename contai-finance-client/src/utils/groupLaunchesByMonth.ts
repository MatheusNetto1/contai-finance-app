// groupLaunchesByMonth.ts
import type { Launch } from "../types/Launch";

export type LaunchGroup = {
  month: string;
  launches: Launch[];
  totalCredit: number;
  totalDebit: number;
  year: number;
  monthIndex: number;
};

export function groupLaunchesByMonth(launches: Launch[]): LaunchGroup[] {
  const groupsMap = new Map<string, LaunchGroup>();

  for (const launch of launches) {
    const date = new Date(launch.date);
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const key = `${year}-${monthIndex}`;

    if (!groupsMap.has(key)) {
      const monthName = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      groupsMap.set(key, {
        month: monthName,
        launches: [],
        totalCredit: 0,
        totalDebit: 0,
        year,
        monthIndex,
      });
    }

    const group = groupsMap.get(key)!;
    group.launches.push(launch);
    if (launch.type === "Credit") group.totalCredit += launch.value;
    else if (launch.type === "Debit") group.totalDebit += launch.value;
  }

  const groups = Array.from(groupsMap.values());

  groups.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.monthIndex - b.monthIndex;
  });

  return groups;
}