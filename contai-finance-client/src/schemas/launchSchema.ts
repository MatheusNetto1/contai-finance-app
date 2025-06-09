import { z } from 'zod';

export const launchSchema = z.object({
  date: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data no formato DD/MM/AAAA'),
  description: z.string().min(1, 'Descrição obrigatória'),
  value: z.number().positive('Valor deve ser positivo'),
  type: z.enum(['Crédito', 'Débito']),
});

export type LaunchFormData = z.infer<typeof launchSchema>;