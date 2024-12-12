# Use a lightweight Node.js base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

COPY . .

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
