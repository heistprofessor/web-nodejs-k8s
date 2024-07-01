# Stage 1: Build Stage
FROM node:14 AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Stage 2: Production Stage
FROM node:14-slim

# Create app directory in the final image
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app .

EXPOSE 3000
CMD ["node", "index.js"]
