FROM node:22-alpine

WORKDIR /usr/src/client

RUN npm install --global eas-cli