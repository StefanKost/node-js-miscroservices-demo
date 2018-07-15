FROM keymetrics/pm2:8-alpine

WORKDIR /usr/src/app
ENV NODE_ENV docker-dev

EXPOSE 3000

CMD ["pm2-runtime", "start", "process.json", "--env", "${NODE_ENV}"]