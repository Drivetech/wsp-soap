FROM mhart/alpine-node:16@sha256:c9014e9e5b33f29d47c867ea548edc0235ba71677f40456409a44c278d8a8e01

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
