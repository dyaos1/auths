FROM node:21.7-alpine

WORKDIR /app

RUN npm install -g pm2

COPY . .

RUN npm install

EXPOSE 3000

CMD npm run start