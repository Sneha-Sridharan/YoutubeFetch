import { google } from 'googleapis';

let currentKeyIndex = 0;
let youTubeKeys = process.env.YOUTUBE_API_KEYS || [];

export function getYouTubeClient() {
  return google.youtube({
    version: 'v3',
    auth: youTubeKeys[currentKeyIndex]
  });
}

export function rotateApiKey() {
  if (currentKeyIndex < youTubeKeys.length - 1) {
    currentKeyIndex++;
  } else {
    currentKeyIndex = 0;
  }
}