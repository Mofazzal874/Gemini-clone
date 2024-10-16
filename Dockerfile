# Step 1: Base image - Use latest Node.js Alpine for a lightweight setup
FROM node:alpine AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files to the working directory
COPY . .

# Step 6: Build the project using Vite (production build)
RUN npm run build

# Step 7: Use Nginx for serving the static files in production
FROM nginx:alpine

# Step 8: Copy the built files from the build stage to Nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose the default Nginx port (80)
EXPOSE 80

# Step 10: Run Nginx in the foreground (daemon off)
CMD ["nginx", "-g", "daemon off;"]
