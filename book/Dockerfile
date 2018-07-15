FROM keymetrics/pm2:8-alpine

ADD run-docker-mongodb /
ADD https://raw.githubusercontent.com/mvertes/dosu/0.1.0/dosu /sbin/

RUN chmod +x /sbin/dosu && \
  echo http://dl-4.alpinelinux.org/alpine/edge/testing >> /etc/apk/repositories && \
  apk add --no-cache mongodb make gcc g++ git python

VOLUME /data/db
ENTRYPOINT [ "/run-docker-mongodb" ]

WORKDIR /usr/src/app
ENV NODE_ENV docker-dev

EXPOSE 3002
EXPOSE 27017

CMD ["pm2-runtime", "start", "process.json", "--env", "${NODE_ENV}"]