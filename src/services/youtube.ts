import { youtubeConfig } from '../constants';
import YouTubeVideos from '../models/youtubeVideosModal';
import { getYouTubeClient, rotateApiKey } from './youtubeClient';

class YouTubeService {
  async getLatestVideosAndAddToDB() {
    try {
      const latestVideo = await YouTubeVideos.findOne({
        order: [['publishTime', 'DESC']]
      });

      youtubeConfig.publishedAfter = latestVideo ? new Date(latestVideo.publishTime.getTime() + 1000).toISOString() : youtubeConfig.publishedAfter;

      const youtube = getYouTubeClient();
      const response = await youtube.search.list(youtubeConfig);
      
      const allVideos = response.data.items || [];
      
      const videos = allVideos.map(item => ({
        title: item.snippet?.title || '',
        description: item.snippet?.description || '',
        publishTime: new Date(item.snippet?.publishedAt || ''),
        thumbnailURLs: Object.values(item.snippet?.thumbnails || {}).map((thumbnail) => thumbnail.url)?.join(', '),
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      await YouTubeVideos.bulkCreate(videos);
      console.log('Videos added to DB');
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        rotateApiKey();
        console.error('API key quota exhausted hence rotating to the next key');
        
        await this.getLatestVideosAndAddToDB();
      } else {
        console.error('Error fetching videos:', error);
      }
    }
  }
}
export default new YouTubeService();