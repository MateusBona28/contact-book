FROM node:18

WORKDIR /app

COPY "package.json" /app

RUN yarn

COPY . /app

CMD ["yarn", "dev"]