"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const youtubeVideosModal_1 = __importDefault(require("../models/youtubeVideosModal"));
const youtubeClient_1 = require("./youtubeClient");
class YouTubeService {
    async getLatestVideosAndAddToDB() {
        try {
            const latestVideo = await youtubeVideosModal_1.default.findOne({
                order: [['publishTime', 'DESC']]
            });
            constants_1.youtubeConfig.publishedAfter = latestVideo ? new Date(latestVideo.publishTime.getTime() + 1000).toISOString() : constants_1.youtubeConfig.publishedAfter;
            const youtube = (0, youtubeClient_1.getYouTubeClient)();
            const response = await youtube.search.list(constants_1.youtubeConfig);
            const allVideos = response.data.items || [];
            const videos = allVideos.map(item => ({
                title: item.snippet?.title || '',
                description: item.snippet?.description || '',
                publishTime: new Date(item.snippet?.publishedAt || ''),
                thumbnailURLs: Object.values(item.snippet?.thumbnails || {}).map((thumbnail) => thumbnail.url)?.join(', '),
                createdAt: new Date(),
                updatedAt: new Date()
            }));
            await youtubeVideosModal_1.default.bulkCreate(videos);
            console.log('Videos added to DB');
        }
        catch (error) {
            if (error.response && error.response.status === 403) {
                (0, youtubeClient_1.rotateApiKey)();
                console.error('API key quota exhausted hence rotating to the next key');
                await this.getLatestVideosAndAddToDB();
            }
            else {
                console.error('Error fetching videos:', error);
            }
        }
    }
}
exports.default = new YouTubeService();
//# sourceMappingURL=youtube.js.map