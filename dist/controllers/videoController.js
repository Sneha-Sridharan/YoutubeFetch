"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const videoRepository_1 = require("../repository/videoRepository");
class VideoController {
    async getVideos(req, res) {
        try {
            const response = await videoRepository_1.videoRepository.getVideosFromDB(req.query);
            res.send(response);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
    async searchVideos(req, res) {
        try {
            if (!req.query.searchKeyword) {
                res.status(400).send({ message: 'Search keyword is required' });
                return;
            }
            const response = await videoRepository_1.videoRepository.searchVideosFromDB(req.query);
            res.send(response);
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
}
exports.default = new VideoController();
//# sourceMappingURL=videoController.js.map