// Launch.ts
export interface Launch {
  id: string;
  date: string;
  description: string;
  value: number;
  type: "Credit" | "Debit";
}