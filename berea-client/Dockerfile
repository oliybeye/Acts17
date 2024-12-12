# Use a lightweight Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and yarn.lock first for dependency caching
COPY package.json yarn.lock ./

# Ensure the `yarn.lock` file exists (optional debug step)
RUN test -f yarn.lock || echo "WARNING: yarn.lock not found!"

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the React application
RUN yarn build

# Install serve for serving the React app
RUN npm install -g serve

# Expose the port used by the server
EXPOSE 3000

# Serve the React application
CMD ["serve", "-s", "build"]
