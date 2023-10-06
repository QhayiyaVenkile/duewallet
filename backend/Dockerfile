FROM node:latest

RUN npm install -g nodemon

WORKDIR /main

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "start"]