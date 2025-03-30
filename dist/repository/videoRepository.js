"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRepository = void 0;
const sequelize_1 = require("sequelize");
const youtubeVideosModal_1 = __importDefault(require("../models/youtubeVideosModal"));
const getVideosFromDB = async (queryParams) => {
    try {
        const { page = 1, limit = 10 } = queryParams;
        const offset = (+page - 1) * +limit;
        const videos = await youtubeVideosModal_1.default.findAll({
            order: [["publishTime", "DESC"]],
            limit: +limit,
            offset: offset,
        });
        return videos;
    }
    catch (error) {
        throw new Error("Error fetching videos from DB");
    }
};
const searchVideosFromDB = async (queryParams) => {
    try {
        const { searchKeyword, page = 1, limit = 10 } = queryParams;
        const offset = (+page - 1) * +limit;
        const videos = await youtubeVideosModal_1.default.findAll({
            where: {
                [sequelize_1.Op.or]: [{ title: { [sequelize_1.Op.like]: `%${searchKeyword}%` } }, { description: { [sequelize_1.Op.like]: `%${searchKeyword}%` } }],
            },
            order: [["publishTime", "DESC"]],
            limit: +limit,
            offset: offset,
        });
        return videos;
    }
    catch (error) {
        throw new Error("Error fetching videos from DB");
    }
};
exports.videoRepository = {
    getVideosFromDB,
    searchVideosFromDB,
};
//# sourceMappingURL=videoRepository.js.map