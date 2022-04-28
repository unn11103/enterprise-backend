FROM node:latest

WORKDIR /enterprise-nodejs
COPY package.json .
RUN npm install
COPY . .
CMD npm start
