import { Request, Response } from 'express';
import { YOUTUBE_API_KEY } from '../constants';
import { google } from 'googleapis';

const youtube = google.youtube({
    version: 'v3',
    auth: YOUTUBE_API_KEY
});

class YouTubeController {
  async getVideos(req: Request, res: Response) {
    try {
      const response = await youtube.search.list({
          part: ['snippet'],
          maxResults: 25,
          type: ['video'],
          q: req.params.keyword
      })
      res.json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching videos' });
    }
  }
}
export default new YouTubeController();