# syntax=docker/dockerfile:1
FROM node:12-alpine
WORKDIR /atelier
COPY . .
RUN yarn install --production
EXPOSE 3000
CMD ["node", "server/app.js"]