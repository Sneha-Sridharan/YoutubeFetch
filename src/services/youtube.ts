import { google } from 'googleapis';
import { youtubeConfig } from '../constants';

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

class YouTubeService {
  async getLatestVideosAndAddToDB() {
    try {
      const response = await youtube.search.list(youtubeConfig)
      res.json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching videos' });
    }
  }
}
export default new YouTubeService();