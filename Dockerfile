FROM mhart/alpine-node:5

MAINTAINER Leonardo Gatica <lgatica@protonmail.com>

# NPM dependencies (cache)
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

ADD . /opt/app
WORKDIR /opt/app
RUN npm run build && npm prune --production

EXPOSE 8000

CMD ["npm", "run", "docker-start"]
