
FROM  --platform=linux/arm/v7 node:18-alpine as build
WORKDIR /build


COPY package*.json .

RUN npm install

COPY . .

RUN npm run build



FROM --platform=linux/arm/v7  node:18-alpine as runner

WORKDIR /app

COPY --from=build /build/package*.json ./
COPY --from=build /build/dist ./dist
COPY --from=build /build/node_modules ./node_modules


CMD ["npm", "start"]




