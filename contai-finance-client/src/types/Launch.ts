export type LaunchType = 'Crédito' | 'Débito';

export interface Launch {
  id: string;
  date: string; // ou usar Date, dependendo do uso
  description: string;
  value: number;
  type: LaunchType;
}