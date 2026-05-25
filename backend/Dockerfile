# Base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining files
COPY . .

# Expose backend port
EXPOSE 5000

# Start application
CMD ["node", "server.js"]
