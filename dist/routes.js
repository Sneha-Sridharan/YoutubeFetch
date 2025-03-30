"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videoController_1 = __importDefault(require("./controllers/videoController"));
const router = (0, express_1.Router)();
router.get("/getVideos", videoController_1.default.getVideos);
router.get("/searchVideos", videoController_1.default.searchVideos);
exports.default = router;
//# sourceMappingURL=routes.js.map