import { Router } from "express";
import videoController from "./controllers/videoController";

const router = Router();

router.get(
    "/getVideos",
    videoController.getVideos,
);
router.get(
    "/searchVideos",
    videoController.searchVideos,
);

export default router;
