"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnect_1 = __importDefault(require("../config/database/dbConnect"));
class YouTubeVideos extends sequelize_1.Model {
}
YouTubeVideos.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    publishTime: {
        type: new sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    thumbnailURLs: {
        type: new sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'youtubeVideos',
    sequelize: dbConnect_1.default,
    indexes: [
        {
            fields: ['publishTime']
        },
        {
            fields: ['title', 'description']
        }
    ]
});
exports.default = YouTubeVideos;
//# sourceMappingURL=youtubeVideosModal.js.map