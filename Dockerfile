FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install --dev

ENTRYPOINT ["/bin/sh"]
