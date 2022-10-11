FROM node:16.14 as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . ./
RUN npm ci 

RUN npm run build

FROM node:16.14-alpine

WORKDIR /app

COPY --from=build /app/build .
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "./index.js"]
