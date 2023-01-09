FROM node:14-alpine as base

WORKDIR /home/node/app

COPY package*.json ./

# RUN apk add --no-cache bash
RUN npm i

COPY . .

FROM base as production

RUN npm run build

CMD ["node", "build/index.js"]