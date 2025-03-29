import express, { Application } from "express";
import router from "./routes";
import cron from "node-cron";
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8081;
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

function logMessage() {
    console.log('Cron job executed at:', new Date().toLocaleString());
}

cron.schedule('* * * * *', logMessage)