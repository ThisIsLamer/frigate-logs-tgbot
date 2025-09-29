FROM node:23 as base
RUN npm install -g npm

WORKDIR /root/app/app

COPY . .
RUN npm ci

RUN npm run build
