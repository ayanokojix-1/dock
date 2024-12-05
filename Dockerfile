FROM node:lts-buster

# Clone the repository
RUN git clone https://github.com/GlobalTechInfo/SUHAIL-XMD /home/suhail

# Change ownership of the directory to the 'node' user
RUN chown -R node:node /home/suhail

# Switch to the 'node' user
USER node

# Set the working directory
WORKDIR /home/suhail

# Copy the server.js file into the working directory
COPY server.js .

# Install dependencies
RUN npm install || yarn install

# Create the start.sh script directly
RUN echo '#!/bin/sh\nnode server.js &\nnpm start' > start.sh

# Make the start.sh script executable
RUN chmod +x start.sh

# Expose the port
EXPOSE 8000

# Run the start.sh script
CMD ./start.sh
