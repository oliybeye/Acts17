# Use a specific Node.js version for consistency
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and yarn.lock first (dependency caching)
COPY package.json yarn.lock ./

RUN ls -la /app

# Install dependencies
RUN yarn install

# Copy the rest of the files into the container
COPY . .

# Build the production app
RUN yarn build:prod

# Install a lightweight HTTP server to serve static files
RUN npm install -g serve

# Expose the app's port
EXPOSE 3000

# Serve the React app
CMD ["serve", "-s", "build"]
