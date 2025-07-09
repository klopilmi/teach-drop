# Stage 1: Build
FROM node:20 AS build

WORKDIR /app
COPY . .

# Install dependencies
RUN npm install

# Fix for PostCSS crypto issue (sometimes still needed even on Node 20)
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the Vite app
RUN npm run build

# Stage 2: Serve
FROM node:20

WORKDIR /app

# Install 'serve' to serve the static files
RUN npm install -g serve

# Copy built files from the build stage
COPY --from=build /app/dist ./dist

EXPOSE 80

# Run the static server
CMD ["serve", "-s", "dist", "-l", "80"]
