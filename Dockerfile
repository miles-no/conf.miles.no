FROM node:14.15.0 as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:14.15.0

WORKDIR /app

#COPY package.lock.json .
#COPY --from=build /app/.svelte-kit/build/. .
COPY --from=build /app/package.json /app/build /app/
# COPY .env ./

EXPOSE 3000
#CMD ["node", "./app.js"]
CMD ["node", "index.js"]