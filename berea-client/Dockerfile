FROM node:latest
WORKDIR /app

COPY . .

# Install dependencies
RUN yarn install --frozen-lockfile

EXPOSE 3000
CMD [ "yarn", "start" ]