import { Request, Response } from "express";
import { videoRepository } from "../repository/videoRepository";

class VideoController {
  async getVideos(req: Request, res: Response) {
    try {
        const response = await videoRepository.getVideosFromDB(req.query);
        res.send(response);
    } catch (error: any) {
        res.status(500).send(error);
    }
  }

  async searchVideos(req: Request, res: Response) {
    try {
        // Search keyword is required.
        if (!req.query.searchKeyword) {
            res.status(400).send({ message: 'Search keyword is required' });
            return;
        }
        const response = await videoRepository.searchVideosFromDB(req.query);
        res.send(response);
    } catch (error: any) {
        res.status(500).send(error);
    }
  }
}
export default new VideoController();