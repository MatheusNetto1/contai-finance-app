// LaunchController.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Launch } from "../entities/Launch";
import { groupBy } from "lodash";

export class LaunchController {
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, type, value, category, launchDate } = req.body;

      if (!title || !type || !value || !category || !launchDate) {
        return res.status(400).json({ message: "All fields are required." });
      }

      if (!['credit', 'debit'].includes(type)) {
        return res.status(400).json({ message: "Invalid type. Must be 'credit' or 'debit'." });
      }

      const launch = AppDataSource.getRepository(Launch).create({
        title,
        type,
        value,
        category,
        launchDate: new Date(launchDate),
      });

      await AppDataSource.getRepository(Launch).save(launch);

      return res.status(201).json(launch);
    } catch (error) {
      return res.status(500).json({ message: "Error creating launch", error });
    }
  };

  list = async (req: Request, res: Response): Promise<Response> => {
    try {
      const launches = await AppDataSource.getRepository(Launch).find({
        order: { launchDate: 'DESC' },
      });

      const formatted = launches.map((launch) => ({
        id: launch.id,
        date: launch.launchDate,
        description: launch.title,
        value: Number(launch.value),
        type: launch.type === 'credit' ? 'Credit' : 'Debit',
      }));

      return res.status(200).json(formatted);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching launches', error });
    }
  };

  summary = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { month, year } = req.query;

      if (!month || !year) {
        return res.status(400).json({ message: "Month and year are required." });
      }

      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      const repository = AppDataSource.getRepository(Launch);

      const [credits, debits] = await Promise.all([
        repository
          .createQueryBuilder("launch")
          .select("SUM(launch.value)", "total")
          .where("launch.type = :type", { type: "credit" })
          .andWhere("launch.launchDate >= :start AND launch.launchDate < :end", {
            start: startDate,
            end: endDate,
          })
          .getRawOne(),

        repository
          .createQueryBuilder("launch")
          .select("SUM(launch.value)", "total")
          .where("launch.type = :type", { type: "debit" })
          .andWhere("launch.launchDate >= :start AND launch.launchDate < :end", {
            start: startDate,
            end: endDate,
          })
          .getRawOne(),
      ]);

      return res.status(200).json({
        credit: Number(credits.total) || 0,
        debit: Number(debits.total) || 0,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error calculating summary", error });
    }
  };

  grouped = async (req: Request, res: Response): Promise<Response> => {
    try {
      const launchRepository = AppDataSource.getRepository(Launch);
      const launches = await launchRepository.find();

      const grouped = groupBy(launches, (launch) => {
        const date = new Date(launch.launchDate);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      });

      const result = Object.entries(grouped).reduce((acc, [month, launches]) => {
        const totals = launches.reduce(
          (sum, launch) => {
            if (launch.type === "credit") sum.credit += Number(launch.value);
            if (launch.type === "debit") sum.debit += Number(launch.value);
            return sum;
          },
          { credit: 0, debit: 0 }
        );

        acc[month] = {
          launches,
          totals,
        };

        return acc;
      }, {} as Record<string, { launches: Launch[]; totals: { credit: number; debit: number } }>);

      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch grouped launches" });
    }
  };
}