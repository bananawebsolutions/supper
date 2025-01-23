# Use an official Node.js image for ARM64
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to optimize build caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# RUN npm run build

# Expose the default Next.js port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]