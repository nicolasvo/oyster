FROM node:alpine

EXPOSE 3000

WORKDIR /app
COPY . .
RUN yarn

ENTRYPOINT ["/bin/sh"]
CMD ["run.sh"]
