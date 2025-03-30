"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const node_cron_1 = __importDefault(require("node-cron"));
const youtube_1 = __importDefault(require("./services/youtube"));
const dbConnect_1 = __importDefault(require("./config/database/dbConnect"));
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/videos", routes_1.default);
app.get("/", (req, res) => {
    res.json({
        Status: "Healthy",
    });
});
dbConnect_1.default.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err);
});
node_cron_1.default.schedule('* * * * *', youtube_1.default.getLatestVideosAndAddToDB);
//# sourceMappingURL=app.js.map