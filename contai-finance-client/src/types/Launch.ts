// Launch.ts
export interface Launch {
  id: number;
  date: string;
  description: string;
  value: number;
  type: "Credit" | "Debit";
}