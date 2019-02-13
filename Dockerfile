FROM node:10.14.2-alpine
WORKDIR /app/client

COPY ./client/package.json package.json
RUN yarn install

COPY ./client/ .
RUN yarn build

WORKDIR /app
COPY package.json package.json
RUN yarn install

COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
