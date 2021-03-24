FROM node:12.16.1-stretch-slim
MAINTAINER Venkat

RUN mkdir /node-crud
WORKDIR /node-crud
ADD package* /node-crud/
RUN npm install
ADD . /node-crud

CMD ["npm", "start"]

EXPOSE 3000 8081