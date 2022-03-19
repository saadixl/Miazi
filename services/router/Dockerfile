FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm install
COPY . .
EXPOSE 80
CMD [ "node", "index.js" ]