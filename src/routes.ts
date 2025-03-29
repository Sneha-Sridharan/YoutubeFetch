import { Router } from "express";
import YouTubeController from "./controllers/youtube";

const router = Router();

// inventory sync
router.get(
    "/testing",
    YouTubeController.getVideos,
);

export default router;
