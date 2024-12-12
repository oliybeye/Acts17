FROM node:latest

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build:prod

RUN npm install -g serve

EXPOSE 3000

ENTRYPOINT ["serve", "build"]