// launch.routes.ts
import { Router } from "express";
import { LaunchController } from "../controllers/LaunchController";

const router = Router();
const launchController = new LaunchController();

router.post("/", launchController.create);
router.get("/", launchController.list);
router.get("/summary", launchController.summary);
router.get("/grouped", launchController.grouped);

export default router;