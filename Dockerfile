# Stage 1: Build the Angular app
FROM node:22 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Replace the backend port in the environment file
ARG BACKEND_PORT
RUN sed -i "s/3001/${BACKEND_PORT}/g" src/environments/environment.ts

# Build the Angular app for production
RUN npm run build

# Start serving the Angular app
CMD ["npm", "start"]