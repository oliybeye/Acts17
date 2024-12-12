# Use a lightweight Node.js image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy only the package files first to leverage Docker caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the React application
RUN yarn build

# Install a lightweight HTTP server to serve the build files
RUN npm install -g serve

# Expose the port used by the HTTP server
EXPOSE 3000

# Serve the React build files
CMD ["serve", "-s", "build"]
