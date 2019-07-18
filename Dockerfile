FROM node:12.4.0

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

RUN npm run seed

EXPOSE 3012

CMD [ "npm", "start" ]