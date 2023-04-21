# Use an official Node.js runtime as a parent image for the build stage
FROM node:19-alpine as build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files to the container
COPY app .

# Setting environment variable for npm test to exit when it is done
ENV CI=true

# Test the React app 
RUN npm test

# Build the React app for production
RUN npm run build


# Use a lightweight Nginx image as a parent image for the production stage
FROM nginx:1.21-alpine

# Install necessary packages
RUN apk update && \
    apk upgrade && \
    apk add nginx openssl

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir /etc/nginx/certs/

# Create a self-signed SSL certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/certs/server.key \
    -out /etc/nginx/certs/server.crt \
    -subj "/C=DK/ST=CA/L=Odense/O=TV2/OU=IT Department/CN=play.tv2.dk"

# Copy the built React app from the build stage to the Nginx document root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80
EXPOSE 443

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
