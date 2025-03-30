FROM node:18.19

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

EXPOSE 8080

ENV NODE_ENV=production

CMD ["npm", "run" ,"start-prod"]