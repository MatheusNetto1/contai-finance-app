// launchSchema.ts
import { z } from "zod";

export const launchSchema = z.object({
  date: z
    .string()
    .regex(/\d{4}-\d{2}-\d{2}/, {
      message: "Invalid date format. Use dd-mm-yyyy.",
    }),
  description: z
    .string()
    .min(1, { message: "Description is required." }),
  value: z
    .number({ invalid_type_error: "Amount is required." })
    .positive({ message: "Amount must be greater than 0." }),
  type: z.enum(["Credit", "Debit"], {
    errorMap: () => ({ message: "Select a valid type." }),
  }),
});

export type LaunchFormData = z.infer<typeof launchSchema>;