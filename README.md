# YouTube API Fetch

[![Express JS](https://img.shields.io/badge/Express.js-4.21.2-green.svg?logo=express)](https://expressjs.com/) [![Node JS](https://img.shields.io/badge/Node.js-18.19.0-green.svg?logo=Node.Js)](https://nodejs.org/)

### Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Setting the App](#setting-the-app)
- [Running the App](#running-the-app)
- [Docker Support](#docker-support)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Infra](#infra)
- [What If service went down?](#what-if-service-went-down)
- [Support](#support)

### Description

This repository is the **Node.js** backend service for YouTube fetch and retrieve.

Functionalities:

- Fetch latest videos from YouTube and store in the database every minute.
- Get the latest videos based on page number and limit from the database.
- Search the videos based on some keyword and return them from the database.

### Installation

Clone the repository and install the dependencies:

```bash
$ git clone https://github.com/Sneha-Sridharan/YoutubeFetch.git
$ cd YoutubeFetch
$ npm install
```

### Setting the App

Add the .env file sent by email in the root directory.

### Running the App
```bash
$ npm run start
```

Post this server should start running on port - **[8080](http://localhost:8080/)**

### Docker Support

To build and run the service in a Docker container:

```bash
$ docker build -t YoutubeFetch .
$ docker run -p 80:8080 YoutubeFetch
```

### Project Structure

```
src/
├── app.ts                # Main app module
├── config/               # Configurations
│   ├── database/         # Database Config
│   │   └── dbConnect.ts  # Sequelize Connect
├── controllers/          # Controller files
├── dto/                  # Query Parameters DTO
├── models/               # DB models 
├── repository/           # API call
├── services/             # Service files
├── constants.ts          # YouTube Config
├── routes.ts             # All the routes 
package.json          # Dependencies & Scripts
```

### Sample API URLs

- http://localhost:8080/videos/getVideos?page=1&limit=20
- http://localhost:8080/videos/searchVideos?page=1&limit=20&searchKeyword=dhoni