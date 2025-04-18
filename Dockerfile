
FROM node:14.17.3 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install


FROM node:14.17.3 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN yarn test
RUN npm run start:build

FROM node:14.17.3 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:14.17.3 as prod
EXPOSE 3000
WORKDIR /app
ENV APP_VERSION=${APP_VERSION}
COPY package.json package.json
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD [ "node","dist/index.js"]