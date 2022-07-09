FROM node:16.6-alpine3.14
WORKDIR /usr/src/
COPY package*.json /
ENV NODE_ENV=production
RUN npm install
RUN apk add git
RUN apk update
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]