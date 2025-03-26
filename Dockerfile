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
RUN sed -i "s/3001/${BACKEND_PORT}/g" src/environments/environment.prod.ts

# Build the Angular app for production
RUN npm run build -- --prod

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy the Angular build output to the nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the port nginx runs on
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]