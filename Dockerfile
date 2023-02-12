FROM node:18.14.0-alpine as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . ./
RUN npm ci 

RUN npm run build

FROM node:18.14.0-alpine

WORKDIR /app

COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "./index.js"]
