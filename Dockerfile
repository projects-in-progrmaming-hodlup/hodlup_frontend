# Build stage
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files from the frontend directory
COPY frontend/package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the frontend directory
COPY frontend/ ./

# Build application
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# debugging issue 
RUN ls -la /app/build

# Runtime stage
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Create nginx.conf that reads PORT environment variable from cloud run - google assigns random ports, so we need this
RUN printf 'server {\n\
    listen $PORT;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf.template

# Use shell to substitute PORT value in nginx.conf
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
