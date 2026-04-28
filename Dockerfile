# Use the official NGINX image from Docker Hub
FROM nginx:alpine

# Copy the static website files to the NGINX html directory
COPY src/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
