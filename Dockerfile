FROM node:17.9.1-alpine3.14
WORKDIR /usr/src/
COPY package*.json /
ENV NODE_ENV=production
RUN npm install
RUN apk add git
RUN apk update
COPY . .
CMD ["npm", "run", "start"]