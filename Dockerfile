# Use the official Node.js image as the base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the prebuilt .next folder
COPY .next .next

# Copy the rest of the application code
COPY public public
COPY src src
COPY next.config.mjs .
COPY pages pages

COPY .env .env

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
