# Use Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend code
COPY backend/ .

# Copy frontend build
COPY frontend/dist ./public

# Serve frontend (optional if already configured in app.js)
# You must serve /public in Express

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "index.js"]