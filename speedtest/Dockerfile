FROM node:21 as build
WORKDIR /app
COPY package.json yarn.lock /app/
RUN [ "yarn", "install", "--frozen-lockfile" ]
COPY . /app/
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN [ "yarn", "build" ]

FROM nginx:1.25.4
COPY --from=build /app/build/ /usr/share/nginx/html