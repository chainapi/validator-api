FROM node:current-alpine3.16

RUN mkdir /app
WORKDIR /app

COPY . .

RUN npm ci

ENV PORT=8000
ENV NODE_ENV=production

RUN npm run build

EXPOSE 8000
CMD ["npm", "run", "start"]

