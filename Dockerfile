FROM node:18 as base

WORKDIR /usr/src/app

#copy folder director to docker container
COPY package.json .env postcss.config.js tailwind.config.js webpack.config.js config-overrides.js cypress.json .eslintrc.yml ./

COPY ./public ./public

COPY src/ ./src

RUN yarn

FROM base as production

