import { Op } from "sequelize";
import { queryParams } from "../dto/queryParams";
import YouTubeVideos from "../models/youtubeVideosModal";

const getVideosFromDB = async (queryParams: queryParams) => {
  try {
    const { page = 1, limit = 10 } = queryParams;
    const offset = (+page - 1) * +limit;

    const videos = await YouTubeVideos.findAll({
      order: [["publishTime", "DESC"]],
      limit: +limit,
      offset: offset,
    });

    return videos;
  } catch (error: any) {
    throw new Error("Error fetching videos from DB");
  }
};

const searchVideosFromDB = async (queryParams: queryParams) => {
  try {
    const { searchKeyword, page = 1, limit = 10 } = queryParams;
    const offset = (+page - 1) * +limit;

    const videos = await YouTubeVideos.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${searchKeyword}%` } }, { description: { [Op.like]: `%${searchKeyword}%` } }],
      },
      order: [["publishTime", "DESC"]],
      limit: +limit,
      offset: offset,
    });

    return videos;
  } catch (error) {
    throw new Error("Error fetching videos from DB");
  }
};

export const videoRepository = {
  getVideosFromDB,
  searchVideosFromDB,
};
