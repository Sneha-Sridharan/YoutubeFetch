import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database/dbConnect';

interface YouTubeVideoAttributes {
  id: number;
  title: string;
  description: string;
  publishTime: Date;
  thumbnailURLs: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface VideoCreationAttributes extends Optional<YouTubeVideoAttributes, 'id'> {}

class YouTubeVideos extends Model<YouTubeVideoAttributes, VideoCreationAttributes> implements YouTubeVideoAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public publishTime!: Date;
  public thumbnailURLs!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

YouTubeVideos.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: new DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: new DataTypes.STRING(255),
      allowNull: false
    },
    publishTime: {
      type: new DataTypes.DATE,
      allowNull: false
    },
    thumbnailURLs: {
      type: new DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'youtubeVideos',
    sequelize
  }
);

export default YouTubeVideos;