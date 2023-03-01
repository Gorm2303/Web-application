# Use an official Node.js runtime as a parent image
FROM node:19-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files to the container
COPY . .

# Build the React app for production
RUN npm run build

# Expose port 3000 to the host
EXPOSE 3000

# Define the command to run the app when the container starts
CMD ["npm", "start"]