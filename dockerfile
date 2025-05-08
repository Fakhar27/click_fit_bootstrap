FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p upload_images

EXPOSE 3000

CMD ["node", "server.js"]