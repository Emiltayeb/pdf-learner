FROM node:12-alpine as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

RUN npm run build

CMD ["node", "build/index.js"]