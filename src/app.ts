import express, { Application } from "express";

import dotenv from 'dotenv';
dotenv.config();

import router from "./routes";
import cron from "node-cron";
import YouTubeService from "./services/youtube";
import sequelize from "./config/database/dbConnect";

const port = process.env.PORT || 8080;
const app: Application = express();

app.use(express.json());

app.use("/videos", router);

app.get("/", (req, res) => {
    res.json({
        Status: "Healthy",
    });
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database:', err);
});

cron.schedule('* * * * *', YouTubeService.getLatestVideosAndAddToDB);