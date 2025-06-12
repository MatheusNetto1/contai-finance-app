// LaunchForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { launchSchema } from "../schemas/launchSchema";
import type { LaunchFormData } from "../schemas/launchSchema";
import { createLaunch } from "../services/launchService";
import { useState } from "react";
import { useLaunches } from "../hooks/useLaunches";

export default function LaunchForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LaunchFormData>({
    resolver: zodResolver(launchSchema),
  });

  const [success, setSuccess] = useState(false);
  const { reload } = useLaunches();

  const onSubmit = async (data: LaunchFormData) => {
    try {
      await createLaunch({
        date: data.date,
        description: data.description,
        amount: data.value,
        type: data.type,
      });
      reset();
      setSuccess(true);
      reload();
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error("Failed to create launch", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-700">New Launch</h2>
      <div>
        <label className="block mb-1 font-medium">Date</label>
        <input
          type="date"
          {...register("date")}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <input
          type="text"
          {...register("description")}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          step="0.01"
          {...register("value", { valueAsNumber: true })}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.value && (
          <p className="text-red-500 text-sm">{errors.value.message}</p>
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">Type</label>
        <select
          {...register("type")}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select</option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {isSubmitting ? "Saving..." : "Save"}
      </button>
      {success && (
        <p className="text-green-600 mt-2">Launch saved successfully!</p>
      )}
    </form>
  );
}