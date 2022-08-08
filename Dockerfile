FROM node:current-alpine3.16

RUN mkdir /app
WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 8000
CMD ["yarn", "start"]

