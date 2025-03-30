"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYouTubeClient = getYouTubeClient;
exports.rotateApiKey = rotateApiKey;
const googleapis_1 = require("googleapis");
let currentKeyIndex = 0;
let youTubeKeys = process.env.YOUTUBE_API_KEY?.split(',') || [];
function getYouTubeClient() {
    return googleapis_1.google.youtube({
        version: 'v3',
        auth: youTubeKeys[currentKeyIndex]
    });
}
function rotateApiKey() {
    if (currentKeyIndex < youTubeKeys.length - 1) {
        currentKeyIndex++;
    }
    else {
        currentKeyIndex = 0;
    }
}
//# sourceMappingURL=youtubeClient.js.map