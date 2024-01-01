FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

ENTRYPOINT ["node", "build/index.js"]