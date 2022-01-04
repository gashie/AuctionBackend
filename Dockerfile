FROM node:16-bullseye-slim
WORKDIR /app 
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3117
RUN chown -R node:node /app
USER node
CMD ["npm", "run", "dev"]