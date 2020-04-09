FROM node:10.16.3

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 4000

CMD ["yarn", "start"]
