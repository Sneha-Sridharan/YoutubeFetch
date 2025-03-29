import express, { Application } from "express";
import router from "./routes";
import cron from "node-cron";
import dotenv from 'dotenv';
import YouTubeService from "./services/youtube";

dotenv.config();

const port = process.env.PORT || 8080;
const app: Application = express();

app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
    res.json({
        Status: "Healthy",
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port} !!`);
});

cron.schedule('* * * * *', YouTubeService.getLatestVideosAndAddToDB);